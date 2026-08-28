"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type SceneProps = {
  selected: string;
};

const UNITS: Record<string, { x: number; z: number }> = {
  "04": { x: 0.35, z: 0.55 },
  "19": { x: 1.45, z: -0.35 },
  "03": { x: -0.55, z: 1.25 },
  "11": { x: -0.85, z: -0.7 },
};

export function Scene({ selected }: SceneProps) {
  const host = useRef<HTMLDivElement>(null);
  const selectedRef = useRef(selected);
  selectedRef.current = selected;

  useEffect(() => {
    const root = host.current;
    if (!root) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xe8e4dc, 1);
    root.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
    camera.position.set(0.2, 7.6, 6.4);
    camera.lookAt(0.1, 0, 0.15);

    const paper = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 18),
      new THREE.MeshBasicMaterial({ color: 0xe8e4dc }),
    );
    paper.rotation.x = -Math.PI / 2;
    scene.add(paper);

    const waterN = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 4.6),
      new THREE.MeshBasicMaterial({ color: 0xc5d2d8 }),
    );
    waterN.rotation.x = -Math.PI / 2;
    waterN.position.set(0, 0.01, -4.15);
    scene.add(waterN);

    const waterE = new THREE.Mesh(
      new THREE.PlaneGeometry(4.2, 10),
      new THREE.MeshBasicMaterial({ color: 0xc5d2d8 }),
    );
    waterE.rotation.x = -Math.PI / 2;
    waterE.position.set(4.85, 0.012, 0.2);
    scene.add(waterE);

    const street = new THREE.LineBasicMaterial({ color: 0x1a1916, transparent: true, opacity: 0.28 });
    const avenue = new THREE.LineBasicMaterial({ color: 0x1a1916, transparent: true, opacity: 0.46 });

    const addLine = (points: [number, number][], mat: THREE.LineBasicMaterial) => {
      const geo = new THREE.BufferGeometry().setFromPoints(
        points.map(([x, z]) => new THREE.Vector3(x, 0.02, z)),
      );
      scene.add(new THREE.Line(geo, mat));
    };

    for (let i = -4; i <= 3; i += 1) {
      addLine(
        [
          [-3.4, i * 0.68],
          [3.2, i * 0.68 + 0.12],
        ],
        street,
      );
    }
    for (let i = -4; i <= 4; i += 1) {
      addLine(
        [
          [i * 0.7, -2.5],
          [i * 0.7 - 0.18, 2.7],
        ],
        i % 2 === 0 ? avenue : street,
      );
    }

    // Market Street diagonal, Embarcadero, Van Ness.
    addLine(
      [
        [-2.9, 1.7],
        [2.55, -0.55],
      ],
      avenue,
    );
    addLine(
      [
        [2.4, -2.2],
        [2.55, 2.5],
      ],
      avenue,
    );
    addLine(
      [
        [-0.85, -2.4],
        [-0.7, 2.55],
      ],
      avenue,
    );

    const park = new THREE.Mesh(
      new THREE.PlaneGeometry(1.85, 0.7),
      new THREE.MeshBasicMaterial({ color: 0xd3d8c6 }),
    );
    park.rotation.x = -Math.PI / 2;
    park.position.set(-1.7, 0.016, -0.15);
    scene.add(park);

    const traffic: THREE.Mesh[] = [];
    const car = new THREE.BoxGeometry(0.11, 0.04, 0.2);
    for (let i = 0; i < 36; i += 1) {
      const mesh = new THREE.Mesh(
        car,
        new THREE.MeshBasicMaterial({ color: i % 6 === 0 ? 0xe30613 : 0x2a2824 }),
      );
      mesh.userData = {
        lane: i % 3,
        t: i / 36,
        speed: 0.035 + (i % 8) * 0.007,
        offset: i,
      };
      scene.add(mesh);
      traffic.push(mesh);
    }

    const vans = Object.entries(UNITS).map(([id, pos]) => {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.11, 0.36),
        new THREE.MeshBasicMaterial({ color: 0x1a1916 }),
      );
      mesh.position.set(pos.x, 0.08, pos.z);
      scene.add(mesh);
      return { id, mesh };
    });

    const resize = () => {
      const w = root.clientWidth;
      const h = root.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
    };
    resize();

    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      traffic.forEach((mesh) => {
        const data = mesh.userData as { lane: number; t: number; speed: number; offset: number };
        data.t = (data.t + data.speed * 0.01) % 1;
        if (data.lane === 0) {
          mesh.position.set(-3.1 + data.t * 6.2, 0.05, -1.7 + (data.offset % 5) * 0.65);
          mesh.rotation.y = Math.PI / 2;
        } else if (data.lane === 1) {
          mesh.position.set(-2.3 + (data.offset % 6) * 0.75, 0.05, -2.3 + data.t * 5);
          mesh.rotation.y = 0;
        } else {
          const x = -2.7 + data.t * 5.1;
          mesh.position.set(x, 0.05, 1.55 - data.t * 2.1);
          mesh.rotation.y = -0.4;
        }
      });
      vans.forEach(({ id, mesh }) => {
        const on = id === selectedRef.current;
        (mesh.material as THREE.MeshBasicMaterial).color.setHex(on ? 0xe30613 : 0x1a1916);
        mesh.scale.setScalar(on ? 1.18 : 1);
      });
      renderer.render(scene, camera);
    };
    tick();

    const ro = new ResizeObserver(resize);
    ro.observe(root);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      renderer.dispose();
      root.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={host} className="sc-gl" style={{ width: "100%", height: "100%" }} />;
}
