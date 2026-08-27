import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans, Newsreader, Source_Serif_4 } from "next/font/google";

export const aiSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--sc-ai-serif",
});

export const foodDisplay = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--sc-food-display",
});

export const dashSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--sc-dash-sans",
});

export const fleetMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--sc-fleet-mono",
});

export const threadSerif = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--sc-thread-serif",
});
