export const faces = {
  inez: { name: "Inez Veld", photo: "/interfaces/people/inez.jpg", role: "Person" },
  karel: { name: "Karel Vos", photo: "/interfaces/people/karel.jpg", role: "Person" },
  loes: { name: "Loes Hart", photo: "/interfaces/people/loes.jpg", role: "Person" },
  bram: { name: "Bram Nijk", photo: "/interfaces/people/bram.jpg", role: "Person" },
  maya: { name: "Maya Ort", photo: "/interfaces/people/maya.jpg", role: "Person" },
  owen: { name: "Owen Hart", photo: "/interfaces/people/owen.jpg", role: "Person" },
  sheet: { name: "Sheet", photo: "/interfaces/people/loes.jpg", role: "Agent" },
  proof: { name: "Proof", photo: "/interfaces/people/owen.jpg", role: "Agent" },
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
