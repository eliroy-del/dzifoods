import type { MetadataRoute } from "next";

import { SITE } from "@/constants/site";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/order/checkout"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE.url.replace(/\/$/, ""),
  };
}
