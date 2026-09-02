import { notFound } from "next/navigation";

/** Hidden. No nav entry. Quiet 404 until the store ships. */
export default function SwagPage() {
  notFound();
}
