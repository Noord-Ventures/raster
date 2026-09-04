import { Avatar } from "@noorddev/vlak-react";

/** Fictional people created for the interface studies. */

export const faces = {
  aziez: { name: "Mara", full: "Mara Vos", photo: "/interfaces/people/mara-v2.jpg", initials: "MV" },
  jenny: { name: "Inez", full: "Inez Bakker", photo: "/interfaces/people/inez-v2.jpg", initials: "IB" },
  koen: { name: "Elias", full: "Elias Noor", photo: "/interfaces/people/elias-v2.jpg", initials: "EN" },
  gianpiero: { name: "Tomas", full: "Tomas Reed", photo: "/interfaces/people/tomas-v2.jpg", initials: "TR" },
} as const;

export type FaceId = keyof typeof faces;

export function Face({ who, size = 28 }: { who: FaceId; size?: number }) {
  const face = faces[who];
  return (
    <Avatar
      className="if-face"
      src={face.photo}
      alt={face.full}
      name={face.full}
      initials={face.initials}
      size={size >= 48 ? "lg" : "md"}
    />
  );
}
