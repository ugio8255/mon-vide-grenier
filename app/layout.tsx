import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Mon Vide Grenier",
  description: "Les trésors cachés de ma maison",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ backgroundColor: '#C5C9B4' }} className="text-[#3E2723]">
        <nav className="w-full bg-[#5D4037] text-white py-2 border-b-2 border-amber-400 fixed top-0 left-0 z-50">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-8">
              <a href="/mon-vide-grenier/" className="text-xl font-serif font-bold tracking-wider ml-8 flex items-center">
          <span className="text-amber-400 mr-2">◆</span> MON VIDE GRENIER
            </a>
              <a href="/mon-vide-grenier/" className="text-sm uppercase tracking-wider hover:text-amber-300 transition">Accueil</a>
              <a href="/mon-vide-grenier/boutique" className="text-sm uppercase tracking-wider hover:text-amber-300 transition">Boutique</a>
              <a href="/mon-vide-grenier/admin" className="text-sm uppercase tracking-wider hover:text-amber-300 transition">L&apos;Atelier</a>
            </div>
            <a href="#" className="text-sm uppercase tracking-wider hover:text-amber-300 transition mr-20">Contact</a>
          </div>
        </nav>
        {children}
        <footer className="bg-[#5D4037] text-stone-300 py-8 px-4 text-center mt-auto">
          <p className="font-serif text-amber-400 text-lg mb-2">Mon Vide Grenier</p>
          <p className="text-sm mb-4">Donner une seconde vie aux objets qui ont une âme.</p>
          <div className="flex justify-center gap-6 text-xs text-stone-400 mb-4">
            <a href="/mon-vide-grenier/mentions-legales" className="hover:text-amber-300 transition">Mentions légales</a>
            <a href="#" className="hover:text-amber-300 transition">CGV</a>
            <a href="mailto:contact@videgrenier-maison.fr" className="hover:text-amber-300 transition">Contact</a>
          </div>
          <p className="text-xs text-stone-500">© 2026 Mon Vide Grenier — Tous droits réservés</p>
        </footer>
      </body>
    </html>
  );
}