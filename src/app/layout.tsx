import type { Metadata, Viewport } from "next";

import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Header } from "@/components/layout/header";
import { ScrollProgress } from "@/components/motion/interactions";
import { CartSheet } from "@/components/order/cart-sheet";
import { Providers } from "@/components/providers";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/constants/site";
import { fontVariables } from "@/lib/fonts";
import { restaurantSchema, websiteSchema } from "@/lib/schema";
import { absoluteUrl } from "@/lib/seo";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  generator: "Next.js",
  keywords: [
    "fine dining Accra",
    "best restaurant Accra",
    "Afro-fusion restaurant",
    "Airport Residential restaurant",
    "private dining Accra",
    "chef's table Ghana",
    "jollof fine dining",
    "steak restaurant Accra",
    "wine dinner Accra",
    "DZIFOODS",
  ],
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  alternates: { canonical: "/" },
  category: "restaurant",
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: SITE.url,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: absoluteUrl("/images/hero-signature.webp"),
        width: 1536,
        height: 1024,
        alt: "Miso-glazed black cod, the signature dish at DZIFOODS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.shortDescription,
    images: [absoluteUrl("/images/hero-signature.webp")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: true, address: true, email: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  other: {
    "geo.region": "GH-AA",
    "geo.placename": "Accra",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08110c" },
    { media: "(prefers-color-scheme: light)", color: "#f7faf4" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GH" suppressHydrationWarning className={`${fontVariables} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <JsonLd id="schema-restaurant" data={[restaurantSchema(), websiteSchema()]} />
      </head>
      <body className="bg-background text-foreground flex min-h-dvh flex-col">
        <Providers>
          <ScrollProgress />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingActions />
          <CartSheet />
        </Providers>
      </body>
    </html>
  );
}
