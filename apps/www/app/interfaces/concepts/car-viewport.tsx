"use client";

import * as React from "react";
import * as THREE from "three";

type ViewportProps = { rotating: boolean; wireframe: boolean; material: "clay" | "graphite"; resetKey: number };

export function CarViewport(props: ViewportProps) {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const options = React.useRef(props);
  options.current = props;
  const [unavailable, setUnavailable] = React.useState(false);

  React.useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x777772);
    scene.fog = new THREE.Fog(0x777772, 9, 18);

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(7.2, 3.8, 7.8);
    camera.lookAt(0, 0.5, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    } catch {
      setUnavailable(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    mount.appendChild(renderer.domElement);

    const car = new THREE.Group();
    scene.add(car);
    const clay = new THREE.MeshPhysicalMaterial({ color: 0xb7b5ae, roughness: 0.28, metalness: 0.16, clearcoat: 0.35 });
    const glass = new THREE.MeshPhysicalMaterial({ color: 0x202428, roughness: 0.08, metalness: 0.55, transparent: true, opacity: 0.82 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.5, metalness: 0.35 });
    const selected = new THREE.MeshPhysicalMaterial({ color: 0xef7d32, roughness: 0.3, metalness: 0.18, clearcoat: 0.4 });

    const body = new THREE.Mesh(new THREE.SphereGeometry(2.85, 96, 64), clay);
    body.scale.set(1.05, 0.31, 0.54);
    body.position.y = 0.72;
    body.castShadow = true;
    car.add(body);

    const sill = new THREE.Mesh(new THREE.BoxGeometry(5.25, 0.42, 2.45, 32, 8, 16), clay);
    sill.position.y = 0.45;
    sill.castShadow = true;
    car.add(sill);

    const cabin = new THREE.Mesh(new THREE.SphereGeometry(1.72, 96, 64), glass);
    cabin.scale.set(1.26, 0.58, 0.79);
    cabin.position.set(-0.15, 1.35, 0);
    cabin.castShadow = true;
    car.add(cabin);

    const door = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.72, 0.035, 28, 12, 1), selected);
    door.position.set(0.4, 0.78, 1.235);
    door.rotation.z = -0.035;
    car.add(door);
    const doorWire = new THREE.LineSegments(new THREE.EdgesGeometry(door.geometry, 24), new THREE.LineBasicMaterial({ color: 0xffd0ac }));
    doorWire.position.copy(door.position);
    doorWire.rotation.copy(door.rotation);
    car.add(doorWire);

    for (const x of [-1.65, 1.65]) for (const z of [-1.23, 1.23]) {
      const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.34, 64, 8), dark);
      tire.rotation.x = Math.PI / 2;
      tire.position.set(x, 0.42, z);
      tire.castShadow = true;
      car.add(tire);
      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.355, 48), clay);
      rim.rotation.x = Math.PI / 2;
      rim.position.copy(tire.position);
      car.add(rim);
    }

    const lightMaterial = new THREE.MeshStandardMaterial({ color: 0xf4f1df, emissive: 0x8f8a65, emissiveIntensity: 1.5 });
    for (const z of [-0.9, 0.9]) {
      const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.16, 0.62), lightMaterial);
      lamp.position.set(2.78, 0.78, z);
      car.add(lamp);
    }

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 30, 40, 40), new THREE.MeshStandardMaterial({ color: 0x686864, roughness: 0.9 }));
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);
    const grid = new THREE.GridHelper(24, 48, 0xa7a79f, 0x85857f);
    grid.position.y = 0.004;
    scene.add(grid);

    scene.add(new THREE.HemisphereLight(0xe9edf3, 0x34332f, 2.2));
    const key = new THREE.DirectionalLight(0xffffff, 3.8);
    key.position.set(4, 8, 6);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    scene.add(key);
    const rimLight = new THREE.DirectionalLight(0xb8d7ff, 2.1);
    rimLight.position.set(-6, 3, -5);
    scene.add(rimLight);

    let dragging = false;
    let previousX = 0;
    let targetRotation = -0.45;
    let previousReset = options.current.resetKey;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const down = (event: PointerEvent) => { dragging = true; previousX = event.clientX; renderer.domElement.setPointerCapture(event.pointerId); };
    const move = (event: PointerEvent) => { if (!dragging) return; targetRotation += (event.clientX - previousX) * 0.008; previousX = event.clientX; };
    const up = () => { dragging = false; };
    renderer.domElement.addEventListener("pointerdown", down);
    renderer.domElement.addEventListener("pointermove", move);
    renderer.domElement.addEventListener("pointerup", up);
    renderer.domElement.addEventListener("pointercancel", up);
    const keydown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      targetRotation += event.key === "ArrowLeft" ? -0.2 : 0.2;
    };
    mount.addEventListener("keydown", keydown);

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = Math.max(width / Math.max(height, 1), 0.1);
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();

    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (previousReset !== options.current.resetKey) {
        targetRotation = -0.45;
        previousReset = options.current.resetKey;
      }
      if (!dragging && options.current.rotating && !reducedMotion.matches) targetRotation += 0.0012;
      clay.color.setHex(options.current.material === "clay" ? 0xb7b5ae : 0x484a49);
      for (const surface of [clay, glass, dark, selected]) surface.wireframe = options.current.wireframe;
      car.rotation.y += (targetRotation - car.rotation.y) * 0.08;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.domElement.removeEventListener("pointerdown", down);
      renderer.domElement.removeEventListener("pointermove", move);
      renderer.domElement.removeEventListener("pointerup", up);
      renderer.domElement.removeEventListener("pointercancel", up);
      mount.removeEventListener("keydown", keydown);
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="cx-live-model" ref={mountRef} tabIndex={0} role="img" aria-label="Interactive electric vehicle model. Drag or use left and right arrow keys to rotate.">{unavailable && <p className="cx-viewport-fallback">The live model needs WebGL. Try this example in a browser with hardware acceleration enabled.</p>}</div>;
}
