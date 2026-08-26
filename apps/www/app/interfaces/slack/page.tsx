import type { Metadata } from "next";
import { interfaceBySlug } from "../catalog";
import "../interfaces.css";
import { Board } from "./board";

const proto = interfaceBySlug("slack")!;

export const metadata: Metadata = {
  title: proto.title,
  description: proto.law,
};

export default function Page() {
  return <Board />;
}
