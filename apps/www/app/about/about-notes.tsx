"use client";

import { Accordion, AccordionItem } from "@noorddev/raster-react";
import { notes } from "./facts";

export function AboutNotes() {
  return (
    <Accordion exclusive>
      {notes.map((note, i) => (
        <AccordionItem key={note.q} title={note.q} defaultOpen={i === 0}>
          {note.a}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
