"use client";

import * as React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const LIVE = "#E8E8E8";
const ALERT = "#C4C2BD";
const NIGHT = "#0E0C0A";
const BUILDING = "#1A1A1A";
const GRID = "#3D3D3D";

type Vehicle = {
  id: string;
  mesh: THREE.Mesh;
  path: THREE.Vector3[];
  t: number;
  speed: number;
};

function rectPath(cx: number, cz: number, w: number, d: number): THREE.Vector3[] {
  return [
    new THREE.Vector3(cx - w, 1.2, cz - d),
    new THREE.Vector3(cx + w, 1.2, cz - d),
    new THREE.Vector3(cx + w, 1.2, cz + d),
    new THREE.Vector3(cx - w, 1.2, cz + d),
  ];
}

function follow(path: THREE.Vector3[], t: number) {
  const n = path.length;
  const i = Math.floor(t) % n;
  const n1 = (i + 1) % n;
  const local = t - Math.floor(t);
  const from = path[i]!;
  const to = path[n1]!;
  return {
    position: from.clone().lerp(to, local),
    yaw: Math.atan2(to.x - from.x, to.z - from.z),
  };
}

export function FleetMap({ selected = "Van 04" }: { selected?: string }) {
  const host = React.useRef<HTMLDivElement>(null);
  const selectedRef = React.useRef(selected);
  selectedRef.current = selected;

  React.useEffect(() => {
    const el = host.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 1, 9000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(2400, 2400),
      new THREE.MeshBasicMaterial({ color: NIGHT, side: THREE.DoubleSide }),
    );
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    const grid = new THREE.GridHelper(1800, 36, GRID, GRID);
    const gridMat = grid.material as THREE.LineBasicMaterial;
    gridMat.transparent = true;
    gridMat.opacity = 0.35;
    scene.add(grid);

    const buildingGeo = new THREE.BoxGeometry(1, 1, 1);
    buildingGeo.translate(0, 0.5, 0);
    const buildingMat = new THREE.MeshBasicMaterial({ color: BUILDING });
    const buildings = new THREE.InstancedMesh(buildingGeo, buildingMat, 86);
    const dummy = new THREE.Object3D();
    let placed = 0;
    for (let x = -8; x <= 8; x++) {
      for (let z = -8; z <= 8; z++) {
        if (placed >= 86) break;
        if ((x + z * 3) % 4 === 0) continue;
        const h = 8 + ((Math.abs(x * 17 + z * 31) % 28) + 6);
        dummy.position.set(x * 42, 0, z * 42);
        dummy.scale.set(16 + (placed % 5), h, 14 + (placed % 4));
        dummy.updateMatrix();
        buildings.setMatrixAt(placed, dummy.matrix);
        placed += 1;
      }
    }
    buildings.count = placed;
    scene.add(buildings);

    const activeMat = new THREE.MeshBasicMaterial({ color: LIVE });
    const pickMat = new THREE.MeshBasicMaterial({ color: "#ffffff" });
    const inactiveMat = new THREE.MeshBasicMaterial({ color: "#4a6464", transparent: true, opacity: 0.5 });
    const alertMat = new THREE.MeshBasicMaterial({ color: ALERT });
    const vanGeo = new THREE.BoxGeometry(6.2, 2.2, 3.1);
    vanGeo.translate(0, 1.1, 0);

    const actives: Vehicle[] = [
      { id: "Van 04", mesh: new THREE.Mesh(vanGeo, activeMat), path: rectPath(-80, -40, 220, 140), t: 0.1, speed: 0.12 },
      { id: "Van 11", mesh: new THREE.Mesh(vanGeo, activeMat), path: rectPath(40, 80, 180, 160), t: 1.4, speed: 0.09 },
      { id: "Bike 08", mesh: new THREE.Mesh(vanGeo, activeMat), path: rectPath(-20, 20, 260, 90), t: 2.2, speed: 0.11 },
      { id: "Boat 02", mesh: new THREE.Mesh(vanGeo, activeMat), path: rectPath(120, -90, 140, 200), t: 0.7, speed: 0.1 },
    ];
    for (const van of actives) scene.add(van.mesh);

    const parked = [
      new THREE.Vector3(-160, 0, 180),
      new THREE.Vector3(-40, 0, 210),
      new THREE.Vector3(90, 0, 200),
      new THREE.Vector3(210, 0, 40),
    ].map((pos) => {
      const mesh = new THREE.Mesh(vanGeo, inactiveMat);
      mesh.position.copy(pos);
      mesh.position.y = 0;
      scene.add(mesh);
      return mesh;
    });

    const alertGeo = new THREE.CylinderGeometry(1.1, 1.1, 28, 8);
    alertGeo.translate(0, 14, 0);
    const alerts = [
      new THREE.Vector3(80, 0, -60),
      new THREE.Vector3(-120, 0, 90),
    ].map((pos) => {
      const mesh = new THREE.Mesh(alertGeo, alertMat);
      mesh.position.copy(pos);
      scene.add(mesh);
      return mesh;
    });

    scene.fog = new THREE.Fog(new THREE.Color(NIGHT), 700, 3800);
    scene.background = new THREE.Color(NIGHT);

    camera.position.set(420, 380, 520);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minPolarAngle = 0.55;
    controls.maxPolarAngle = 1.25;
    controls.autoRotate = false;

    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      camera.aspect = w / Math.max(1, h);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    let frame = 0;
    let last = performance.now();
    const tick = () => {
      frame = requestAnimationFrame(tick);
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      if (!reduced) {
        for (const van of actives) {
          van.t += van.speed * dt;
          const pose = follow(van.path, van.t);
          van.mesh.position.copy(pose.position);
          van.mesh.rotation.y = pose.yaw;
          van.mesh.material = van.id === selectedRef.current ? pickMat : activeMat;
        }
      }
      controls.update();
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      controls.dispose();
      renderer.dispose();
      buildingGeo.dispose();
      vanGeo.dispose();
      alertGeo.dispose();
      ground.geometry.dispose();
      (ground.material as THREE.Material).dispose();
      buildingMat.dispose();
      activeMat.dispose();
      pickMat.dispose();
      inactiveMat.dispose();
      alertMat.dispose();
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
      void parked;
    };
  }, []);

  return <div ref={host} className="sc-fleet-map if-fleet-map" aria-hidden="true" />;
}
