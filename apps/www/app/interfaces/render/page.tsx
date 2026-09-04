import type { Metadata } from "next";
import { interfaceBySlug } from "../catalog";
import { ConceptBoard } from "../concepts/board";
import "../concepts/scene.css";
import "../interfaces.css";
import { InterfaceShell } from "../shell";

const proto = interfaceBySlug("render")!;

export const metadata: Metadata = { title: proto.title, description: proto.law };

export default function Page() {
  return <InterfaceShell slug="render"><ConceptBoard kind="render" /></InterfaceShell>;
}
