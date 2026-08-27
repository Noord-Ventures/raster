import type { Metadata } from "next";
import { interfaceBySlug } from "../catalog";
import { InterfacesNav } from "../nav";
import "../interfaces.css";
import { Board } from "./board";

const proto = interfaceBySlug("delivery")!;

export const metadata: Metadata = {
  title: proto.title,
  description: proto.law,
};

export default function Page() {
  return (
    <>
      <InterfacesNav rail={false} />
      <Board />
    </>
  );
}
