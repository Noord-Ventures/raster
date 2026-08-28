/** People from https://renatovaldes.com/work. First names in the UI. Portraits from /work refs. */

export const faces = {
  ilana: { name: "Ilana", full: "Ilana Diamond", photo: "/interfaces/people/ilana.jpg", initials: "ID" },
  aziez: { name: "Aziez", full: "Aziez Soekha", photo: "/interfaces/people/aziez.jpg", initials: "AS" },
  jenny: { name: "Jenny", full: "Jenny Lo", photo: "/interfaces/people/jenny.jpg", initials: "JL" },
  christian: { name: "Christian", full: "Christian Reber", photo: "/interfaces/people/christian.jpg", initials: "CR" },
  katie: { name: "Katie", full: "Katie Dill", photo: "/interfaces/people/katie.jpg", initials: "KD" },
  koen: { name: "Koen", full: "Koen Bok", photo: "/interfaces/people/koen.jpg", initials: "KB" },
  gianpiero: { name: "Gianpiero", full: "Gianpiero Puleo", photo: "/interfaces/people/gianpiero.jpg", initials: "GP" },
  senka: { name: "Senka", full: "Senka Hadzimuratovic", photo: "/interfaces/people/senka.jpg", initials: "SH" },
} as const;

export type FaceId = keyof typeof faces;

export function Face({ who, size = 28 }: { who: FaceId; size?: number }) {
  const face = faces[who];
  if (face.photo) {
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
  return (
    <span className="if-face if-face-inits" style={{ width: size, height: size, fontSize: size * 0.36 }}>
      {face.initials}
    </span>
  );
}
