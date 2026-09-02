import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fire Watch DZ",
  description: "Signalement citoyen d'incendies en temps reel pour l'Algerie",
  manifest: "/manifest.json",
  themeColor: "#dc2626",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
