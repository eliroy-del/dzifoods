import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DZIFOODS",
    short_name: "DZIFOODS",
    description: "Afro-fusion fine dining in Accra — fire, terroir and craft.",
    start_url: "/",
    display: "standalone",
    background_color: "#08110c",
    theme_color: "#185323",
    orientation: "portrait-primary",
    categories: ["food", "restaurant"],
    lang: "en-GH",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/logo.png",
        sizes: "248x248",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
