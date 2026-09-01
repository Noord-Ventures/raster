export type SwagItem = {
  slug: string;
  title: string;
  print: string;
  still: string;
};

/**
 * Raster swag blanks. Stills live in /public/swag and can be swapped
 * when Ilana sends Noord-page reference shots — keep slugs and print
 * areas; only replace the JPEG.
 */
export const SWAG: SwagItem[] = [
  { slug: "hoodie", title: "Hoodie", print: "Chest", still: "/swag/hoodie.jpg" },
  { slug: "tote", title: "Tote", print: "Front panel", still: "/swag/tote.jpg" },
  { slug: "mug", title: "Mug", print: "Wrap", still: "/swag/mug.jpg" },
  { slug: "cap", title: "Cap", print: "Front", still: "/swag/cap.jpg" },
  { slug: "notebook", title: "Notebook", print: "Cover", still: "/swag/notebook.jpg" },
  { slug: "bottle", title: "Bottle", print: "Wrap", still: "/swag/bottle.jpg" },
  { slug: "stickers", title: "Sticker sheet", print: "Kiss-cut", still: "/swag/stickers.jpg" },
];
