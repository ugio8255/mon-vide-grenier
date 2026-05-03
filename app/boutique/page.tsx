"use client";

import { useEffect, useState } from "react";
import { getProduits, Produit } from "../lib/produits";

export default function Boutique() {
  const [produits, setProduits] = useState<Produit[]>([]);

  useEffect(() => {
    setProduits(getProduits());
  }, []);

  return (
    <main className="min-h-screen bg-[#fdf6f0] text-[#3E2723]">
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-amber-900 text-center mb-4">
          La Collection Complète
        </h1>
        <p className="text-center text-stone-500 mb-12 max-w-2xl mx-auto">
          Explorez notre sélection méticuleuse d objets qui racontent une histoire.
          Chaque pièce est une promesse de charme pour votre intérieur.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produits.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-amber-100 hover:shadow-lg transition"
            >
              <div className="h-48 bg-stone-200 flex items-center justify-center text-stone-400">
                📷 {p.categorie}
              </div>
              <div className="p-4">
                <span className="text-xs text-amber-600 font-bold uppercase">
                  {p.categorie}
                </span>
                <h3 className="text-lg font-semibold mt-1">{p.nom}</h3>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xl font-bold text-amber-900">{p.prix}€</span>
                  <span className="text-xs bg-stone-100 px-2 py-1 rounded-full">{p.etat}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-stone-800 text-stone-300 py-8 px-4 text-center">
        <p className="font-serif text-amber-400 text-lg">Mon Vide Grenier</p>
        <p className="text-xs text-stone-500">contact@monvidegrenier.fr</p>
      </footer>
    </main>
  );
}