/** People from https://renatovaldes.com/work. First names in the UI. Portraits from /work refs. */

export const faces = {
  aziez: { name: "Aziez", full: "Aziez Soekha", photo: "/interfaces/people/aziez.webp", initials: "AS" },
  jenny: { name: "Jenny", full: "Jenny Lo", photo: "/interfaces/people/jenny.webp", initials: "JL" },
  koen: { name: "Koen", full: "Koen Bok", photo: "/interfaces/people/koen.webp", initials: "KB" },
  gianpiero: { name: "Gianpiero", full: "Gianpiero Puleo", photo: "/interfaces/people/gianpiero.webp", initials: "GP" },
} as const;

export type FaceId = keyof typeof faces;

export function Face({ who, size = 28 }: { who: FaceId; size?: number }) {
  const face = faces[who];
  return (
    <img
      className="if-face"
      src={face.photo}
      alt=""
      width={size}
      height={size}
      style={{ width: size, height: size }}
    />
  );
}
