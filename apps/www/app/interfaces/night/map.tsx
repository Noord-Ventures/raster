"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type SceneProps = {
  selected: string;
};

const PITCH = 2.2;
const STREET = 0.58;
const CITY = 5;
const SPAN = (CITY * 2 + 1) * PITCH;
/** City centroid: lots sit on (i + 0.5) * PITCH. */
const LOOK_X = 1.1;
const LOOK_Y = 0.35;
const LOOK_Z = 1.1;

const UNITS: Record<string, { x: number; z: number; rot: number }> = {
  "04": { x: 0.16, z: PITCH, rot: 0 },
  "19": { x: 0.16, z: -PITCH, rot: 0 },
  "03": { x: -PITCH, z: -0.16, rot: Math.PI / 2 },
  "11": { x: 0.16, z: -3 * PITCH, rot: 0 },
};

const TONES = [0xddd8d0, 0xd2cdc5, 0xe4dfd7, 0xcfcac2, 0xdbd6ce, 0xd8d3cb, 0xc8c3bb, 0xe2ddd5, 0xd0cbc3, 0xccc7bf];

function lot(i: number, j: number) {
  const n = Math.abs((i * 47 + j * 13) % 17);
  return {
    h: 0.36 + (n % 8) * 0.14,
    w: 0.92 + (n % 3) * 0.1,
    d: 0.92 + ((n + 2) % 3) * 0.1,
    tone: TONES[n % TONES.length]!,
    split: n % 5 === 0,
  };
}

const BUILDINGS: { x: number; z: number; w: number; d: number; h: number; tone: number }[] = [];
for (let i = -CITY; i <= CITY; i += 1) {
  for (let j = -CITY; j <= CITY; j += 1) {
    if (i === -3 && j === 1) continue;
    if (j <= -CITY && i >= 2) continue;
    const cell = lot(i, j);
    const cx = (i + 0.5) * PITCH;
    const cz = (j + 0.5) * PITCH;
    const pad = STREET * 0.42;
    if (cell.split) {
      BUILDINGS.push({
        x: cx - cell.w * 0.28,
        z: cz,
        w: cell.w * 0.52,
        d: cell.d,
        h: cell.h * 0.82,
        tone: cell.tone,
      });
      BUILDINGS.push({
        x: cx + cell.w * 0.3,
        z: cz,
        w: cell.w * 0.48,
        d: cell.d * 0.9,
        h: cell.h * 1.12,
        tone: TONES[(i + j + 3) % TONES.length]!,
      });
    } else {
      BUILDINGS.push({
        x: cx,
        z: cz,
        w: Math.min(cell.w, PITCH - STREET - pad),
        d: Math.min(cell.d, PITCH - STREET - pad),
        h: cell.h,
        tone: cell.tone,
      });
    }
  }
}

function facadeTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.fillStyle = "#d8d4cc";
  ctx.fillRect(0, 0, 64, 128);
  ctx.fillStyle = "rgba(26, 25, 22, 0.12)";
  for (let y = 10; y < 118; y += 12) {
    for (let x = 8; x < 58; x += 12) {
      ctx.fillRect(x, y, 7, 8);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 2;
  return tex;
}

function slab(w: number, d: number, h: number, radius = 0.028) {
  const shape = new THREE.Shape();
  const hw = w / 2;
  const hd = d / 2;
  const r = Math.min(radius, hw, hd);
  shape.moveTo(-hw + r, -hd);
  shape.lineTo(hw - r, -hd);
  shape.quadraticCurveTo(hw, -hd, hw, -hd + r);
  shape.lineTo(hw, hd - r);
  shape.quadraticCurveTo(hw, hd, hw - r, hd);
  shape.lineTo(-hw + r, hd);
  shape.quadraticCurveTo(-hw, hd, -hw, hd - r);
  shape.lineTo(-hw, -hd + r);
  shape.quadraticCurveTo(-hw, -hd, -hw + r, -hd);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: h,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelSegments: 2,
    curveSegments: 6,
  });
  geo.rotateX(-Math.PI / 2);
  return geo;
}

function vehicle(kind: "van" | "car", ink: number) {
  const group = new THREE.Group();
  const body = new THREE.Mesh(
    slab(kind === "van" ? 0.18 : 0.13, kind === "van" ? 0.34 : 0.24, kind === "van" ? 0.11 : 0.055, 0.024),
    new THREE.MeshLambertMaterial({ color: ink }),
  );
  body.position.y = kind === "van" ? 0.055 : 0.036;
  body.castShadow = true;
  group.add(body);
  if (kind === "van") {
    const cabin = new THREE.Mesh(
      slab(0.16, 0.13, 0.09, 0.016),
      new THREE.MeshLambertMaterial({ color: ink }),
    );
    cabin.position.set(0, 0.13, 0.08);
    cabin.castShadow = true;
    group.add(cabin);
  }
  const wheel = new THREE.CylinderGeometry(0.028, 0.028, 0.032, 8);
  wheel.rotateZ(Math.PI / 2);
  const rubber = new THREE.MeshLambertMaterial({ color: 0x1a1916 });
  const spots: [number, number][] = kind === "van" ? [[-0.08, 0.11], [0.08, 0.11], [-0.08, -0.11], [0.08, -0.11]] : [[-0.055, 0.07], [0.055, 0.07], [-0.055, -0.07], [0.055, -0.07]];
  spots.forEach(([x, z]) => {
    const mesh = new THREE.Mesh(wheel, rubber);
    mesh.position.set(x, 0.028, z);
    group.add(mesh);
  });
  group.userData.body = body;
  return group;
}

export function Scene({ selected }: SceneProps) {
  const host = useRef<HTMLDivElement>(null);
  const selectedRef = useRef(selected);
  selectedRef.current = selected;

  useEffect(() => {
    const root = host.current;
    if (!root) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xe8e4dc, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    root.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xe8e4dc, 22, 48);
    const camera = new THREE.PerspectiveCamera(44, 1, 0.2, 90);
    camera.position.set(10.4, 12.8, 11.6);
    camera.lookAt(LOOK_X, LOOK_Y, LOOK_Z);

    scene.add(new THREE.AmbientLight(0xe8e4dc, 0.78));
    const sun = new THREE.DirectionalLight(0xfff6ea, 0.72);
    sun.position.set(8, 24, 6);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.near = 2;
    sun.shadow.camera.far = 50;
    sun.shadow.camera.left = -18;
    sun.shadow.camera.right = 18;
    sun.shadow.camera.top = 18;
    sun.shadow.camera.bottom = -18;
    scene.add(sun);

    const paper = new THREE.Mesh(
      new THREE.PlaneGeometry(56, 56),
      new THREE.MeshLambertMaterial({ color: 0xe8e4dc }),
    );
    paper.rotation.x = -Math.PI / 2;
    paper.receiveShadow = true;
    scene.add(paper);

    const street = new THREE.MeshLambertMaterial({ color: 0xc6c2ba });
    const walk = new THREE.MeshLambertMaterial({ color: 0xdedad2 });
    const mark = new THREE.MeshBasicMaterial({ color: 0xf3efe7 });
    const run = SPAN + PITCH;

    for (let n = -CITY; n <= CITY + 1; n += 1) {
      const ns = new THREE.Mesh(new THREE.PlaneGeometry(STREET, run), street);
      ns.rotation.x = -Math.PI / 2;
      ns.position.set(n * PITCH, 0.012, PITCH * 0.5);
      ns.receiveShadow = true;
      scene.add(ns);
      const ew = new THREE.Mesh(new THREE.PlaneGeometry(run, STREET), street);
      ew.rotation.x = -Math.PI / 2;
      ew.position.set(PITCH * 0.5, 0.013, n * PITCH);
      ew.receiveShadow = true;
      scene.add(ew);
    }

    for (let n = -CITY; n <= CITY; n += 1) {
      const slabWalk = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.03, run * 0.92), walk);
      slabWalk.position.set(n * PITCH - STREET * 0.52, 0.02, PITCH * 0.5);
      slabWalk.receiveShadow = true;
      scene.add(slabWalk);
      const slabWalk2 = slabWalk.clone();
      slabWalk2.position.x = n * PITCH + STREET * 0.52;
      scene.add(slabWalk2);
    }

    const stripe = new THREE.BoxGeometry(0.06, 0.005, 0.28);
    for (const z of [-PITCH, PITCH, 0]) {
      for (let i = -3; i <= 3; i += 1) {
        const bar = new THREE.Mesh(stripe, mark);
        bar.position.set(i * 0.1, 0.018, z);
        scene.add(bar);
      }
    }

    const water = new THREE.Mesh(
      new THREE.PlaneGeometry(SPAN + 8, 6.4),
      new THREE.MeshLambertMaterial({ color: 0xc5d2d8 }),
    );
    water.rotation.x = -Math.PI / 2;
    water.position.set(2.2, 0.01, -CITY * PITCH - 3.4);
    scene.add(water);

    const park = new THREE.Mesh(
      new THREE.PlaneGeometry(PITCH - STREET, PITCH - STREET),
      new THREE.MeshLambertMaterial({ color: 0xd3d8c6 }),
    );
    park.rotation.x = -Math.PI / 2;
    park.position.set((-3 + 0.5) * PITCH, 0.016, (1 + 0.5) * PITCH);
    scene.add(park);

    const windows = facadeTexture();
    const roofMat = new THREE.MeshLambertMaterial({ color: 0xb8b3ab });
    BUILDINGS.forEach((b) => {
      const mat = new THREE.MeshLambertMaterial({
        color: b.tone,
        map: windows ?? undefined,
      });
      if (windows) {
        mat.map = windows.clone();
        mat.map.repeat.set(Math.max(1, Math.round(b.w * 2.2)), Math.max(1, Math.round(b.h * 2.4)));
        mat.map.needsUpdate = true;
      }
      const mass = new THREE.Mesh(new THREE.BoxGeometry(b.w, b.h, b.d), mat);
      mass.position.set(b.x, b.h / 2, b.z);
      mass.castShadow = b.h > 0.7;
      mass.receiveShadow = true;
      scene.add(mass);
      const roof = new THREE.Mesh(new THREE.BoxGeometry(b.w * 0.92, 0.04, b.d * 0.92), roofMat);
      roof.position.set(b.x, b.h + 0.02, b.z);
      scene.add(roof);
    });

    const lampPole = new THREE.CylinderGeometry(0.016, 0.02, 0.62, 8);
    const lampHead = new THREE.BoxGeometry(0.07, 0.026, 0.1);
    const inkMat = new THREE.MeshLambertMaterial({ color: 0x1a1916 });
    for (let n = -4; n <= 4; n += 1) {
      [-STREET * 0.42, STREET * 0.42].forEach((x) => {
        const pole = new THREE.Mesh(lampPole, inkMat);
        pole.position.set(x, 0.33, n * PITCH);
        pole.castShadow = true;
        scene.add(pole);
        const head = new THREE.Mesh(lampHead, inkMat);
        head.position.set(x + (x < 0 ? 0.03 : -0.03), 0.64, n * PITCH);
        scene.add(head);
      });
      if (n !== 0) {
        const pole = new THREE.Mesh(lampPole, inkMat);
        pole.position.set(n * PITCH, 0.33, STREET * 0.42);
        scene.add(pole);
        const head = new THREE.Mesh(lampHead, inkMat);
        head.position.set(n * PITCH, 0.64, STREET * 0.42 + 0.03);
        scene.add(head);
      }
    }

    const curb: [number, number, number][] = [];
    for (let n = -3; n <= 3; n += 1) {
      if (n === 0) continue;
      curb.push([-0.28, n * PITCH * 0.7, Math.PI]);
      curb.push([0.28, n * PITCH * 0.55, 0]);
    }
    curb.forEach(([x, z, rot], i) => {
      const car = vehicle("car", i % 3 === 0 ? 0x3a3834 : 0x2a2824);
      car.position.set(x, 0, z);
      car.rotation.y = rot;
      scene.add(car);
    });

    const route = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.16, 0.03, 4 * PITCH),
      new THREE.Vector3(0.16, 0.03, PITCH),
      new THREE.Vector3(0.16, 0.03, -PITCH),
      new THREE.Vector3(0.16, 0.03, -3 * PITCH),
      new THREE.Vector3(-PITCH, 0.03, -3 * PITCH),
      new THREE.Vector3(-PITCH, 0.03, -0.16),
      new THREE.Vector3(-2 * PITCH, 0.03, -0.16),
    ]);
    const path = new THREE.Mesh(
      new THREE.TubeGeometry(route, 96, 0.018, 8, false),
      new THREE.MeshBasicMaterial({ color: 0x1a1916, transparent: true, opacity: 0.34 }),
    );
    scene.add(path);

    const vans = Object.entries(UNITS).map(([id, pos]) => {
      const mesh = vehicle("van", 0x1a1916);
      mesh.position.set(pos.x, 0, pos.z);
      mesh.rotation.y = pos.rot;
      scene.add(mesh);
      return { id, mesh };
    });

    const traffic: THREE.Group[] = [];
    for (let i = 0; i < 8; i += 1) {
      const car = vehicle("car", 0x2a2824);
      car.userData.t = i / 8;
      car.userData.axis = i % 3 === 0 ? "ew" : "ns";
      scene.add(car);
      traffic.push(car);
    }

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const w = root.clientWidth;
      const h = root.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / Math.max(h, 1);
      if (h > w * 1.15) {
        camera.position.set(12.2, 15.0, 13.6);
        camera.fov = 48;
      } else {
        camera.position.set(10.4, 12.8, 11.6);
        camera.fov = 44;
      }
      camera.lookAt(LOOK_X, LOOK_Y, LOOK_Z);
      camera.updateProjectionMatrix();
    };
    resize();

    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (!still) {
        traffic.forEach((car) => {
          car.userData.t = ((car.userData.t as number) + 0.0011) % 1;
          const t = car.userData.t as number;
          if (car.userData.axis === "ew") {
            car.position.set(-4.4 + t * 9.2, 0, 0.16);
            car.rotation.y = Math.PI / 2;
          } else {
            car.position.set(0.16, 0, 5.2 - t * 11.4);
            car.rotation.y = 0;
          }
        });
      }
      vans.forEach(({ id, mesh }) => {
        const on = id === selectedRef.current;
        mesh.traverse((obj) => {
          if (obj instanceof THREE.Mesh && obj.geometry.type === "ExtrudeGeometry") {
            (obj.material as THREE.MeshLambertMaterial).color.setHex(on ? 0xe30613 : 0x1a1916);
          }
        });
      });
      renderer.render(scene, camera);
    };
    tick();

    const ro = new ResizeObserver(resize);
    ro.observe(root);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const mat = obj.material;
          const list = Array.isArray(mat) ? mat : [mat];
          list.forEach((item) => {
            if ("map" in item && item.map) item.map.dispose();
            item.dispose();
          });
        }
      });
      windows?.dispose();
      renderer.dispose();
      root.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={host} className="sc-gl" style={{ width: "100%", height: "100%" }} />;
}
