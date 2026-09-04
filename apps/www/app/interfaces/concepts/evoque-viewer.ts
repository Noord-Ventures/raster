// Public model metadata: https://api.sketchfab.com/v3/models/034600db0cc94d64a7f3ccb19c7799fa
// Viewer API: https://sketchfab.com/developers/viewer/functions
export const evoqueModel = {
  id: "034600db0cc94d64a7f3ccb19c7799fa",
  url: "https://sketchfab.com/3d-models/2022-land-rover-range-rover-evoque-034600db0cc94d64a7f3ccb19c7799fa",
} as const;

type Vector3 = [number, number, number];
export type ViewerCamera = { position: Vector3; target: Vector3 };
export type ViewerMaterial = {
  name: string;
  stateSetID: number;
  channels: Record<string, { color?: number[]; [key: string]: unknown }>;
  [key: string]: unknown;
};
export type ViewerApi = {
  start: () => void;
  stop: () => void;
  addEventListener: (name: string, listener: () => void) => void;
  removeEventListener: (name: string, listener: () => void) => void;
  setBackground: (options: { color: Vector3 }) => void;
  getCameraLookAt: (callback: (error: unknown, camera: ViewerCamera) => void) => void;
  recenterCamera: (callback: (error: unknown) => void) => void;
  setCameraLookAt: (position: Vector3, target: Vector3, duration: number) => void;
  getMaterialList: (callback: (error: unknown, materials: ViewerMaterial[]) => void) => void;
  setMaterial: (material: ViewerMaterial) => void;
  setWireframe: (enabled: boolean, options: { color: string }) => void;
};
type ViewerOptions = {
  autostart: number;
  camera: number;
  dnt: number;
  scrollwheel: number;
  ui_stop: number;
  success: (api: ViewerApi) => void;
  error: () => void;
};
type ViewerConstructor = new (version: string, iframe: HTMLIFrameElement) => { init: (id: string, options: ViewerOptions) => void };
type ViewerWindow = Window & { Sketchfab?: ViewerConstructor };

let viewerScript: Promise<ViewerConstructor> | undefined;

export function loadEvoqueViewer(): Promise<ViewerConstructor> {
  const host = window as ViewerWindow;
  if (host.Sketchfab) return Promise.resolve(host.Sketchfab);
  if (viewerScript) return viewerScript;
  viewerScript = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js";
    script.async = true;
    const fail = () => {
      window.clearTimeout(timeout);
      viewerScript = undefined;
      script.remove();
      reject(new Error("Viewer API could not load"));
    };
    const timeout = window.setTimeout(fail, 15000);
    script.onload = () => {
      window.clearTimeout(timeout);
      if (host.Sketchfab) resolve(host.Sketchfab);
      else fail();
    };
    script.onerror = fail;
    document.head.appendChild(script);
  });
  return viewerScript;
}
