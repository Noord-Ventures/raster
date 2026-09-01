/** People from https://renatovaldes.com/work. First names in the UI. Portraits from /work refs. */

export const faces = {
  aziez: { name: "Aziez", full: "Aziez Soekha", photo: "/interfaces/people/aziez.jpg", initials: "AS" },
  jenny: { name: "Jenny", full: "Jenny Lo", photo: "/interfaces/people/jenny.jpg", initials: "JL" },
  koen: { name: "Koen", full: "Koen Bok", photo: "/interfaces/people/koen.jpg", initials: "KB" },
  gianpiero: { name: "Gianpiero", full: "Gianpiero Puleo", photo: "/interfaces/people/gianpiero.jpg", initials: "GP" },
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
