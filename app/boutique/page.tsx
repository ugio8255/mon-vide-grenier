"use client";
import { useEffect, useState } from "react";
import { getProduits, Produit } from "../lib/produits";

export default function Boutique() {
  const [produits, setProduits] = useState<Produit[]>([]);

  useEffect(() => {
    setProduits(getProduits());
  }, []);

  return (
    <main className="min-h-screen bg-[#C5C9B4] text-[#3E2723] pt-16">
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-amber-900 text-center mb-4">
          La Collection Complète
        </h1>
        <p className="text-center text-stone-500 mb-12 max-w-2xl mx-auto">
          Explorez notre sélection méticuleuse d'objets qui racontent une histoire.
          Chaque pièce est une promesse de charme pour votre intérieur.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produits.map((p) => (
            <a
              key={p.id}
              href={`/produit/${p.id}`}
              className="bg-[#FDF8F4] rounded-2xl shadow-md overflow-hidden border border-amber-100 hover:shadow-lg transition block"
            >
              <div className="h-48 bg-transparent flex items-center justify-center overflow-hidden rounded-t-2xl relative">
                {p.images && p.images.length > 0 ? (
                  <>
                    <img src={p.images[0]} alt={p.nom} className="w-full h-full object-contain bg-transparent" />
                    {p.images.length >= 2 && (
                      <span className="absolute top-2 right-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-full">
                        +{p.images.length}
                      </span>
                    )}
                  </>
                ) : (
                  <p className="text-stone-400">{p.categorie}</p>
                )}
              </div>
              <div className="p-4">
                <span className="text-xs text-amber-600 font-bold uppercase">
                  {p.categorie}
                </span>
                <h3 className="text-lg font-semibold mt-1">{p.nom}</h3>
                <div><strong>{p.nom}</strong> — {p.prix}€ — {p.etat}</div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xl font-bold text-amber-900">{p.prix}€</span>
                  <span className="text-xs bg-stone-100 px-2 py-1 rounded-full">{p.etat}</span>
                </div>
              </div>
            </a>
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