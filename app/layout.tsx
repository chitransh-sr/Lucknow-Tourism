import type { Metadata } from "next";
import { Inter, Space_Grotesk, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Lucknow Tourism — City of Nawabs, Heritage & Culture",
  description:
    "Discover Lucknow — the heart of Awadh and Uttar Pradesh. Explore Bara Imambara, Rumi Darwaza, Chikankari, legendary kebabs, and timeless Nawabi culture.",
  openGraph: {
    title: "Lucknow Tourism — City of Nawabs, Heritage & Culture",
    description:
      "Monuments, cuisine, and culture — a visitor-first guide to the City of Nawabs.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#c9a96e",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`page-home page-light ${inter.variable} ${spaceGrotesk.variable} ${bricolage.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
