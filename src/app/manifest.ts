import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DZIFOODS",
    short_name: "DZIFOODS",
    description: "Afro-fusion fine dining in Accra — fire, terroir and craft.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0d0c",
    theme_color: "#103d2e",
    orientation: "portrait-primary",
    categories: ["food", "restaurant"],
    lang: "en-GH",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
