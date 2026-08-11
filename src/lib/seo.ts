import type { Metadata } from "next";

import { SITE } from "@/constants/site";

export function absoluteUrl(path = "/"): string {
  const base = SITE.url.replace(/\/$/, "");
  return path.startsWith("http") ? path : `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

interface PageMetaInput {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly image?: string;
  readonly keywords?: readonly string[];
  readonly type?: "website" | "article";
  readonly noIndex?: boolean;
}

/**
 * Single entry point for per-page metadata so canonical URLs, Open Graph and
 * Twitter cards can never drift apart.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = "/images/hero-signature.webp",
  keywords = [],
  type = "website",
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = path === "/" ? title : `${title} | ${SITE.name}`;

  return {
    title,
    description,
    keywords: [...keywords],
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: SITE.name,
      locale: SITE.locale,
      images: [{ url: absoluteUrl(image), width: 1536, height: 1024, alt: `${SITE.name} — ${title}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl(image)],
    },
  };
}
