import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Notre jardin secret",
  description: "Une expérience romantique interactive, pensée comme un journal numérique intime.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Notre jardin secret",
    description: "Un petit endroit rien qu’à nous.",
    type: "website",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Notre jardin secret" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Notre jardin secret",
    description: "Un petit endroit rien qu’à nous.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
