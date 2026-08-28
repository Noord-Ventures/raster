import type { Metadata } from "next";
import { interfaceBySlug } from "../catalog";
import { InterfaceShell } from "../shell";
import "../interfaces.css";
import "./scene.css";
import { Board } from "./board";

const proto = interfaceBySlug("ai-tool")!;

export const metadata: Metadata = {
  title: proto.title,
  description: proto.law,
};

export default function Page() {
  return (
    <InterfaceShell slug="ai-tool">
      <Board />
    </InterfaceShell>
  );
}
