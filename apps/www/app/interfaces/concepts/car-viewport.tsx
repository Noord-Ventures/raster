"use client";

import * as React from "react";
import { Button } from "@noorddev/vlak-react";
import { loadVehicleViewer, vehicleModel, type ViewerApi, type ViewerCamera, type ViewerMaterial } from "./vehicle-viewer";

type ViewportProps = {
  rotating: boolean;
  wireframe: boolean;
  material: "clay" | "graphite";
  resetKey: number;
  onStatusChange?: (status: "loading" | "ready" | "error") => void;
};

export function CarViewport(props: ViewportProps) {
  const mountRef = React.useRef<HTMLDivElement>(null);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const options = React.useRef(props);
  options.current = props;
  const [status, setStatus] = React.useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = React.useState(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: changing attempt intentionally reinitializes the third-party viewer
  React.useEffect(() => {
    const mount = mountRef.current;
    const iframe = iframeRef.current;
    if (!mount || !iframe) return;

    let disposed = false;
    let api: ViewerApi | undefined;
    let ready = false;
    let hovering = false;
    let cameraPending = false;
    let homeCamera: ViewerCamera | undefined;
    let paint: ViewerMaterial | undefined;
    let previousMaterial: ViewportProps["material"] | undefined;
    let previousWireframe: boolean | undefined;
    let previousReset = options.current.resetKey;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const report = (next: "loading" | "ready" | "error") => {
      if (disposed) return;
      setStatus(next);
      options.current.onStatusChange?.(next);
    };
    const fail = () => {
      if (disposed) return;
      ready = false;
      api?.stop();
      report("error");
    };
    report("loading");
    const timeout = window.setTimeout(fail, 45000);

    const rotateCamera = (angle: number, duration = 0) => {
      if (!api || !ready || cameraPending) return;
      cameraPending = true;
      api.getCameraLookAt((error, camera) => {
        cameraPending = false;
        if (disposed || error || !ready) return;
        const x = camera.position[0] - camera.target[0];
        const y = camera.position[1] - camera.target[1];
        api?.setCameraLookAt([
          camera.target[0] + x * Math.cos(angle) - y * Math.sin(angle),
          camera.target[1] + x * Math.sin(angle) + y * Math.cos(angle),
          camera.position[2],
        ], camera.target, duration);
      });
    };

    const applyOptions = () => {
      if (!api || !ready) return;
      const current = options.current;
      if (current.wireframe !== previousWireframe) {
        api.setWireframe(current.wireframe, { color: "202020FF" });
        previousWireframe = current.wireframe;
      }
      if (paint && current.material !== previousMaterial) {
        const color = current.material === "clay" ? [0.62, 0.60, 0.54] : [0.13, 0.14, 0.14];
        for (const name of ["DiffuseColor", "DiffusePBR", "AlbedoPBR"]) {
          if (paint.channels[name]) paint.channels[name] = { ...paint.channels[name], color };
        }
        api.setMaterial(paint);
        previousMaterial = current.material;
      }
      if (current.resetKey !== previousReset && homeCamera) {
        api.setCameraLookAt(homeCamera.position, homeCamera.target, reducedMotion.matches ? 0 : 0.3);
        previousReset = current.resetKey;
      }
    };

    const fitCamera = () => {
      if (disposed || !ready || !api) return;
      api.recenterCamera((error) => {
        if (disposed || error) return;
        api?.getCameraLookAt((cameraError, camera) => {
          if (disposed || cameraError) return;
          const home = homeCamera ?? camera;
          const direction = home.position.map((value, index) => value - home.target[index]!);
          const distance = Math.hypot(...camera.position.map((value, index) => value - camera.target[index]!));
          const scale = distance / Math.max(Math.hypot(...direction), 0.001);
          homeCamera = {
            position: [
              camera.target[0] + direction[0]! * scale,
              camera.target[1] + direction[1]! * scale,
              camera.target[2] + direction[2]! * scale,
            ],
            target: camera.target,
          };
        });
      });
    };

    const onReady = () => {
      if (disposed || !api) return;
      window.clearTimeout(timeout);
      ready = true;
      api.setBackground({ color: [0.37, 0.37, 0.35] });
      api.getCameraLookAt((error, camera) => {
        if (!disposed && !error) {
          homeCamera = camera;
          fitCamera();
        }
      });
      api.getMaterialList((error, materials) => {
        if (disposed || error) return;
        // The creator's paint material is distinct from glass, trim and wheels.
        paint = materials.find((material) => material.name === "Carro_Pintura");
        applyOptions();
      });
      applyOptions();
      report("ready");
    };

    if (!navigator.onLine) {
      window.clearTimeout(timeout);
      fail();
    } else {
      loadVehicleViewer().then((Sketchfab) => {
        if (disposed) return;
        const viewer = new Sketchfab("1.12.1", iframe);
        viewer.init(vehicleModel.id, {
          autostart: 1,
          camera: 0,
          dnt: 1,
          scrollwheel: 0,
          ui_stop: 0,
          success(viewerApi) {
            if (disposed) { viewerApi.stop(); return; }
            api = viewerApi;
            api.addEventListener("viewerready", onReady);
            api.addEventListener("error", fail);
            api.start();
          },
          error: fail,
        });
      }).catch(() => {
        window.clearTimeout(timeout);
        fail();
      });
    }

    const enter = () => { hovering = true; };
    const leave = () => { hovering = false; };
    iframe.addEventListener("pointerenter", enter);
    iframe.addEventListener("pointerleave", leave);
    const keydown = (event: KeyboardEvent) => {
      if (event.target !== mount || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;
      event.preventDefault();
      rotateCamera(event.key === "ArrowLeft" ? -0.18 : 0.18, reducedMotion.matches ? 0 : 0.15);
    };
    mount.addEventListener("keydown", keydown);
    let resizeTimer = 0;
    const observer = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(fitCamera, 150);
    });
    observer.observe(iframe);

    // The documented camera API drives the turntable. Native drag/zoom remains
    // available, and hovering or focusing the viewer pauses the turntable.
    const turntable = window.setInterval(() => {
      if (disposed || !ready || document.hidden) return;
      applyOptions();
      if (options.current.rotating && !reducedMotion.matches && !hovering && document.activeElement !== iframe) rotateCamera(0.01);
    }, 100);

    return () => {
      disposed = true;
      ready = false;
      window.clearTimeout(timeout);
      window.clearInterval(turntable);
      window.clearTimeout(resizeTimer);
      observer.disconnect();
      iframe.removeEventListener("pointerenter", enter);
      iframe.removeEventListener("pointerleave", leave);
      mount.removeEventListener("keydown", keydown);
      api?.removeEventListener("viewerready", onReady);
      api?.removeEventListener("error", fail);
      api?.stop();
    };
  }, [attempt]);

  return <div className="cx-live-model cx-vehicle-viewport" ref={mountRef} tabIndex={0} role="region" aria-label="Interactive vehicle model. Drag to orbit or focus this region and use the arrow keys." data-viewer-status={status}>
    <iframe key={attempt} ref={iframeRef} className="cx-vehicle-frame" title="3D vehicle model by tonielpro520" allow="autoplay; fullscreen; xr-spatial-tracking" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
    {status !== "ready" && <div className="cx-vehicle-status" role="status">
      <b>{status === "loading" ? "Loading vehicle model" : "The 3D model could not load"}</b>
      <p>{status === "loading" ? "Preparing the detailed model and its materials." : "This viewer needs an internet connection and WebGL. Retry, or open the model on Sketchfab."}</p>
      {status === "error" && <div><Button variant="ghost" onClick={() => setAttempt((value) => value + 1)}>Retry viewer</Button><a href={vehicleModel.url} target="_blank" rel="noreferrer">Open model ↗</a></div>}
    </div>}
    <p className="cx-vehicle-credit"><a href={vehicleModel.url} target="_blank" rel="noreferrer">Model by tonielpro520</a><span>·</span><a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">CC BY 4.0</a><span>· Paint adapted</span></p>
  </div>;
}
