import { Inter, Playfair_Display, Poppins } from "next/font/google";

/**
 * Three typefaces, three jobs:
 * - Playfair Display: editorial headlines
 * - Inter: body copy and UI text
 * - Poppins: buttons, labels and eyebrows
 *
 * All are self-hosted by next/font, so there is no render-blocking request and
 * no layout shift (`display: swap` + automatic fallback metrics).
 */

export const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  preload: true,
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
});

export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  preload: false,
});

export const fontVariables = `${playfair.variable} ${inter.variable} ${poppins.variable}`;
