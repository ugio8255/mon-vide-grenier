import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Mon Vide Grenier | Brocante en ligne - Objets d'occasion",
  description: "Découvrez nos trésors cachés : objets d'occasion, électronique, outils, décoration. Brocante en ligne, livraison soignée ou retrait sur place.",
  keywords: "vide grenier, brocante en ligne, objets occasion, électronique occasion, achat occasion France",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ backgroundColor: '#C5C9B4' }} className="text-[#3E2723]">
        <Navbar />
        {children}
        <footer className="bg-[#5D4037] text-stone-300 py-8 px-4 text-center mt-auto">
          <p className="font-serif text-amber-400 text-lg mb-2">Mon Vide Grenier</p>
          <p className="text-sm mb-4">Donner une seconde vie aux objets qui ont une âme.</p>
          <div className="flex justify-center gap-6 text-xs text-stone-400 mb-4">
            <a href="/mentions-legales" className="hover:text-amber-300 transition">Mentions légales</a>
            <a href="/cgv" className="hover:text-amber-300 transition">CGV</a>
            <a href="mailto:contact@videgrenier-maison.fr" className="hover:text-amber-300 transition">Contact</a>
          </div>
          <p className="text-xs text-stone-500">© 2026 Mon Vide Grenier — Tous droits réservés</p>
        </footer>
      </body>
    </html>
  );
}