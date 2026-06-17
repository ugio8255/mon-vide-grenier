"use client";
import { useEffect, useState } from "react";
import { getProduits, Produit } from "../lib/produits";

export default function Boutique() {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [filtre, setFiltre] = useState("");
  const [recherche, setRecherche] = useState("");

  useEffect(() => {
    const charger = async () => {
      const data = await getProduits();
      setProduits(data);
    };
    charger();
  }, []);
const estNouveau = (id: string) => {
  const timestamp = parseInt(id);
  const septJours = 7 * 24 * 60 * 60 * 1000;
  return Date.now() - timestamp < septJours;
};
  return (
    <main className="min-h-screen bg-[#C5C9B4] text-[#3E2723] pt-16">
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-widest mb-6">
            ✨ Pièces Uniques
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-amber-900">
            La Collection Complète
          </h1>
          <p className="text-stone-500 max-w-2xl mx-auto italic">
            Explorez notre sélection méticuleuse d&apos;objets qui racontent une histoire. 
            Chaque pièce est une promesse de charme pour votre intérieur.
          </p>
          <div className="w-24 h-px bg-amber-300 mx-auto mt-12" />
        </div>

        {/* Barre de recherche */}
<div className="max-w-md mx-auto mb-6 -mt-12">
  <input
    type="text"
    placeholder="🔍 Rechercher un objet..."
    value={recherche}
    onChange={(e) => setRecherche(e.target.value)}
    className="w-full px-4 py-3 rounded-full border border-amber-200 bg-white/80 text-[#3E2723] placeholder-stone-400 focus:outline-none focus:border-amber-400 shadow-sm text-sm"
  />
</div>  
        {/* Tri par catégorie */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10 mb-4">
  <button onClick={() => setFiltre("")} className={`text-xs font-bold uppercase tracking-wider transition ${filtre === "" ? "text-amber-700 underline" : "text-stone-400 hover:text-amber-700"}`}>Toutes</button>
  {[...new Set(produits.map(p => p.categorie))].sort().map(cat => (
    <button key={cat} onClick={() => setFiltre(cat)} className={`text-xs font-bold uppercase tracking-wider transition ${filtre === cat ? "text-amber-700 underline" : "text-stone-500 hover:text-amber-800"}`}>{cat}</button>
  ))}
</div>

        {/* Grille des produits */}
        {produits.length === 0 ? (
          <div className="col-span-full py-32 text-center text-stone-400 italic">
            L&apos;Atelier prépare actuellement de nouvelles trouvailles...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {produits
  .filter(p => !filtre || p.categorie === filtre)
  .filter(p => !recherche || p.nom.toLowerCase().includes(recherche.toLowerCase()) || p.categorie.toLowerCase().includes(recherche.toLowerCase()) || (p.description && p.description.toLowerCase().includes(recherche.toLowerCase())))
  .map((p) => (
              <a
                key={p.id}
                href={`/produit?id=${p.id}`}
                className="group block bg-white rounded-[2rem] overflow-hidden border border-amber-100 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="p-3">
                  <div className="aspect-[4/5] relative overflow-hidden rounded-[1.5rem] bg-stone-100 ring-1 ring-amber-200/50">
                    {p.images && p.images.length > 0 ? (
                      <>
                        <img src={p.images[0]} alt={p.nom} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        {p.images.length >= 2 && (
                          <span className="absolute top-2 right-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-full">
                            +{p.images.length}
                          </span>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full text-stone-400">{p.categorie}</div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/80 backdrop-blur-sm text-[#3E2723] font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                        {p.etat}
                      </span>
                       {estNouveau(p.id) && (
    <span className="bg-amber-400/90 backdrop-blur-sm text-amber-900 font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full animate-pulse">
      Nouveau
    </span>
  )}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-2">
                  <p className="text-[10px] text-stone-400 mb-2 uppercase tracking-[0.2em] font-bold">
                    {p.categorie}
                  </p>
                  <h3 className="text-xl font-bold text-[#3E2723] group-hover:text-amber-700 transition-colors truncate">
                    {p.nom}
                  </h3>
                  <p className="text-sm text-stone-500 line-clamp-2 mt-3 leading-relaxed italic h-10">
                    {p.description || "Aucune description"}
                  </p>
                </div>

                <div className="p-6 pt-0 flex justify-between items-center border-t border-amber-100 mt-auto">
                  <span className="text-2xl font-black text-amber-700">{p.prix}€</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400 group-hover:text-amber-700 group-hover:translate-x-1 transition-all">
                    DÉTAILS →
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}