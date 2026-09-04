import type { Metadata } from "next";
import { interfaceBySlug } from "../catalog";
import { ConceptBoard } from "../concepts/board";
import "../concepts/scene.css";
import "../interfaces.css";
import { InterfaceShell } from "../shell";

const proto = interfaceBySlug("drive")!;

export const metadata: Metadata = { title: proto.title, description: proto.law };

export default function Page() {
  return <InterfaceShell slug="drive"><ConceptBoard kind="drive" /></InterfaceShell>;
}
