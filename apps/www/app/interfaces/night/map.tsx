"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type SceneProps = {
  selected: string;
};

const UNITS: Record<string, { x: number; z: number; rot: number }> = {
  "04": { x: 0.18, z: 1.55, rot: 0 },
  "19": { x: 0.18, z: -0.35, rot: 0 },
  "03": { x: -1.85, z: -1.05, rot: Math.PI / 2 },
  "11": { x: 0.18, z: -2.55, rot: 0 },
};

const BUILDINGS: { x: number; z: number; w: number; d: number; h: number; tone: number }[] = [
  { x: -2.15, z: 2.35, w: 1.55, d: 1.2, h: 1.7, tone: 0xddd8d0 },
  { x: -2.05, z: 1.05, w: 1.35, d: 1.05, h: 2.15, tone: 0xd2cdc5 },
  { x: -2.25, z: -0.15, w: 1.7, d: 0.95, h: 1.25, tone: 0xe4dfd7 },
  { x: -2.1, z: -2.15, w: 1.45, d: 1.35, h: 1.9, tone: 0xcfcac2 },
  { x: -2.35, z: -3.55, w: 1.25, d: 1.05, h: 1.05, tone: 0xdbd6ce },
  { x: 2.2, z: 2.2, w: 1.4, d: 1.3, h: 1.45, tone: 0xd8d3cb },
  { x: 2.35, z: 0.85, w: 1.6, d: 1.1, h: 2.4, tone: 0xc8c3bb },
  { x: 2.1, z: -0.25, w: 1.2, d: 0.9, h: 1.15, tone: 0xe2ddd5 },
  { x: 2.3, z: -2.05, w: 1.55, d: 1.2, h: 1.75, tone: 0xd0cbc3 },
  { x: 2.15, z: -3.4, w: 1.35, d: 1.15, h: 2.05, tone: 0xccc7bf },
];

function facadeTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.fillStyle = "#d8d4cc";
  ctx.fillRect(0, 0, 64, 128);
  ctx.fillStyle = "rgba(26, 25, 22, 0.16)";
  for (let y = 10; y < 118; y += 12) {
    for (let x = 8; x < 58; x += 12) {
      ctx.fillRect(x, y, 7, 8);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 4;
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
    slab(kind === "van" ? 0.22 : 0.16, kind === "van" ? 0.42 : 0.3, kind === "van" ? 0.14 : 0.07, 0.03),
    new THREE.MeshLambertMaterial({ color: ink }),
  );
  body.position.y = kind === "van" ? 0.07 : 0.045;
  body.castShadow = true;
  group.add(body);
  if (kind === "van") {
    const cabin = new THREE.Mesh(
      slab(0.2, 0.16, 0.12, 0.02),
      new THREE.MeshLambertMaterial({ color: ink }),
    );
    cabin.position.set(0, 0.16, 0.1);
    cabin.castShadow = true;
    group.add(cabin);
  }
  const wheel = new THREE.CylinderGeometry(0.035, 0.035, 0.04, 10);
  wheel.rotateZ(Math.PI / 2);
  const rubber = new THREE.MeshLambertMaterial({ color: 0x1a1916 });
  const spots: [number, number][] = kind === "van" ? [[-0.1, 0.14], [0.1, 0.14], [-0.1, -0.14], [0.1, -0.14]] : [[-0.07, 0.09], [0.07, 0.09], [-0.07, -0.09], [0.07, -0.09]];
  spots.forEach(([x, z]) => {
    const mesh = new THREE.Mesh(wheel, rubber);
    mesh.position.set(x, 0.035, z);
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
    scene.fog = new THREE.Fog(0xe8e4dc, 14, 32);
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
    camera.position.set(5.1, 5.5, 7.4);
    camera.lookAt(0, 0.12, -0.7);

    scene.add(new THREE.AmbientLight(0xe8e4dc, 0.72));
    const sun = new THREE.DirectionalLight(0xfff6ea, 0.85);
    sun.position.set(5.2, 7.4, 3.4);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 22;
    sun.shadow.camera.left = -8;
    sun.shadow.camera.right = 8;
    sun.shadow.camera.top = 8;
    sun.shadow.camera.bottom = -8;
    scene.add(sun);

    const paper = new THREE.Mesh(
      new THREE.PlaneGeometry(28, 28),
      new THREE.MeshLambertMaterial({ color: 0xe8e4dc }),
    );
    paper.rotation.x = -Math.PI / 2;
    paper.receiveShadow = true;
    scene.add(paper);

    const street = new THREE.MeshLambertMaterial({ color: 0xc6c2ba });
    const walk = new THREE.MeshLambertMaterial({ color: 0xdedad2 });
    const mark = new THREE.MeshBasicMaterial({ color: 0xf3efe7 });

    const main = new THREE.Mesh(new THREE.PlaneGeometry(1.55, 8.4), street);
    main.rotation.x = -Math.PI / 2;
    main.position.set(0, 0.012, -0.4);
    main.receiveShadow = true;
    scene.add(main);

    [-1.05, 0.85, -2.85].forEach((z) => {
      const cross = new THREE.Mesh(new THREE.PlaneGeometry(7.2, 1.15), street);
      cross.rotation.x = -Math.PI / 2;
      cross.position.set(0, 0.013, z);
      cross.receiveShadow = true;
      scene.add(cross);
    });

    const side = (x: number) => {
      const slabWalk = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.04, 8.2), walk);
      slabWalk.position.set(x, 0.03, -0.35);
      slabWalk.receiveShadow = true;
      scene.add(slabWalk);
    };
    side(-0.98);
    side(0.98);

    const stripe = new THREE.BoxGeometry(0.08, 0.006, 0.42);
    for (const z of [-1.05, 0.85]) {
      for (let i = -4; i <= 4; i += 1) {
        const bar = new THREE.Mesh(stripe, mark);
        bar.position.set(i * 0.14, 0.02, z);
        scene.add(bar);
      }
    }

    const water = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 3.4),
      new THREE.MeshLambertMaterial({ color: 0xc5d2d8 }),
    );
    water.rotation.x = -Math.PI / 2;
    water.position.set(0.6, 0.01, -5.6);
    scene.add(water);

    const park = new THREE.Mesh(
      new THREE.PlaneGeometry(1.6, 1.1),
      new THREE.MeshLambertMaterial({ color: 0xd3d8c6 }),
    );
    park.rotation.x = -Math.PI / 2;
    park.position.set(-3.4, 0.016, 0.85);
    scene.add(park);

    const windows = facadeTexture();
    BUILDINGS.forEach((b) => {
      const mat = new THREE.MeshLambertMaterial({
        color: b.tone,
        map: windows ?? undefined,
      });
      if (windows) {
        mat.map = windows.clone();
        mat.map.repeat.set(Math.max(1, Math.round(b.w * 2)), Math.max(2, Math.round(b.h * 2)));
        mat.map.needsUpdate = true;
      }
      const mass = new THREE.Mesh(new THREE.BoxGeometry(b.w, b.h, b.d), mat);
      mass.position.set(b.x, b.h / 2, b.z);
      mass.castShadow = true;
      mass.receiveShadow = true;
      scene.add(mass);
      const roof = new THREE.Mesh(
        new THREE.BoxGeometry(b.w * 0.92, 0.05, b.d * 0.92),
        new THREE.MeshLambertMaterial({ color: 0xb8b3ab }),
      );
      roof.position.set(b.x, b.h + 0.02, b.z);
      roof.castShadow = true;
      scene.add(roof);
    });

    const lampPole = new THREE.CylinderGeometry(0.018, 0.022, 0.72, 8);
    const lampHead = new THREE.BoxGeometry(0.08, 0.03, 0.12);
    const inkMat = new THREE.MeshLambertMaterial({ color: 0x1a1916 });
    for (let i = 0; i < 6; i += 1) {
      const z = 2.4 - i * 1.05;
      [-0.82, 0.82].forEach((x) => {
        const pole = new THREE.Mesh(lampPole, inkMat);
        pole.position.set(x, 0.38, z);
        pole.castShadow = true;
        scene.add(pole);
        const head = new THREE.Mesh(lampHead, inkMat);
        head.position.set(x + (x < 0 ? 0.04 : -0.04), 0.74, z);
        scene.add(head);
      });
    }

    const parked: THREE.Group[] = [];
    const curb: [number, number, number][] = [
      [-0.62, 2.05, Math.PI],
      [-0.62, 0.15, Math.PI],
      [-0.62, -1.85, Math.PI],
      [0.62, 2.15, 0],
      [0.62, 0.05, 0],
      [0.62, -1.75, 0],
      [0.62, -3.15, 0],
    ];
    curb.forEach(([x, z, rot], i) => {
      const car = vehicle("car", i % 3 === 0 ? 0x3a3834 : 0x2a2824);
      car.position.set(x, 0, z);
      car.rotation.y = rot;
      scene.add(car);
      parked.push(car);
    });

    const route = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.18, 0.03, 2.6),
      new THREE.Vector3(0.18, 0.03, 0.85),
      new THREE.Vector3(0.18, 0.03, -1.05),
      new THREE.Vector3(0.18, 0.03, -2.85),
      new THREE.Vector3(-1.85, 0.03, -2.85),
      new THREE.Vector3(-1.85, 0.03, -1.05),
    ]);
    const path = new THREE.Mesh(
      new THREE.TubeGeometry(route, 64, 0.02, 8, false),
      new THREE.MeshBasicMaterial({ color: 0x1a1916, transparent: true, opacity: 0.38 }),
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
    for (let i = 0; i < 5; i += 1) {
      const car = vehicle("car", 0x2a2824);
      car.userData.t = i / 5;
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
        camera.position.set(6.0, 6.4, 8.4);
      } else {
        camera.position.set(5.1, 5.5, 7.4);
      }
      camera.lookAt(0, 0.12, -0.7);
      camera.updateProjectionMatrix();
    };
    resize();

    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (!still) {
        traffic.forEach((car) => {
          car.userData.t = ((car.userData.t as number) + 0.0016) % 1;
          const t = car.userData.t as number;
          car.position.set(0.18, 0, 2.7 - t * 6.4);
          car.rotation.y = 0;
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
