"use client";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Produit } from "../lib/produits";
import { Suspense } from "react";

function ProduitContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [produit, setProduit] = useState<Produit | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (!id) return;
    const stored = localStorage.getItem("produits");
    if (!stored) return;
    const produits: Produit[] = JSON.parse(stored);
    const trouve = produits.find(p => String(p.id) === id);
    setProduit(trouve || null);
  }, [id]);

  const images = produit?.images || [];
  
  const nextImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  if (!id) return <p className="text-center py-20 text-stone-500">Aucun produit sélectionné.</p>;
  if (!produit) return <p className="text-center py-20 text-stone-500">Produit introuvable.</p>;

  return (
    <main className="min-h-screen bg-[#C5C9B4] text-[#3E2723] pt-16">
      <div className="max-w-6xl mx-auto py-10 px-4">
        {/* Retour */}
        <a href="/boutique" className="inline-flex items-center text-sm text-stone-500 hover:text-amber-700 mb-8 transition-colors">
          <span className="text-xl mr-2">←</span> Retour à la collection
        </a>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galerie photos */}
          <div className="space-y-4">
            <div className="aspect-square relative rounded-[2rem] overflow-hidden shadow-2xl border-2 border-amber-600/50 bg-white group">
              {images.length > 0 ? (
                <>
                  <img
                    src={images[activeImageIndex]}
                    alt={produit.nom}
                    className="w-full h-full object-contain transition-transform duration-500"
                  />
                  {images.length > 1 && (
                    <>
                      <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        ◂
                      </button>
                      <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        ▸
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveImageIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              idx === activeImageIndex ? "bg-amber-700 w-6" : "bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <p className="text-stone-400 flex items-center justify-center h-full">Aucune image</p>
              )}
            </div>

            {/* Miniatures */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                      idx === activeImageIndex ? "border-amber-700 shadow-md scale-105" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={url} alt={`${produit.nom} - ${idx+1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Infos produit */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  {produit.categorie}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                  produit.etat === "Très bon état" ? "bg-green-100 text-green-800" :
                  produit.etat === "Bon état" ? "bg-blue-100 text-blue-800" :
                  produit.etat === "Dans son jus" ? "bg-amber-100 text-amber-800" :
                  "bg-red-100 text-red-800"
                }`}>
                  {produit.etat}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-amber-900">{produit.nom}</h1>
              <p className="text-4xl font-black text-amber-700">{produit.prix}€</p>
            </div>

            {/* Fiche état */}
            <div className="bg-[#EDE0D4] rounded-3xl p-6 border border-amber-100 mb-8 space-y-4 shadow-sm">
              <div className="flex justify-between items-center text-sm">
                <span className="text-stone-400 font-bold uppercase tracking-wider text-[10px]">État de la pépite</span>
                <span className="font-bold text-[#3E2723]">{produit.etat}</span>
              </div>
              <hr className="border-amber-200" />
              <div className="flex justify-between items-center text-sm">
                <span className="text-stone-400 font-bold uppercase tracking-wider text-[10px]">Catégorie</span>
                <span className="font-bold text-[#3E2723]">{produit.categorie}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h3 className="font-bold mb-4 uppercase tracking-[0.2em] text-xs text-stone-400">L&apos;Histoire de l&apos;Objet</h3>
              {produit.description ? (
                <p className="text-[#3E2723]/80 leading-relaxed italic font-light text-lg">
                  {produit.description}
                </p>
              ) : (
                <p className="text-stone-400 italic">✨ Aucune description pour cet objet — son histoire reste à écrire.</p>
              )}
            </div>

            <hr className="border-amber-200 mb-8" />

            {/* Sécurité / Livraison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 text-sm bg-white/50 p-4 rounded-2xl border border-amber-100">
                <span className="text-xl">🔒</span>
                <div>
                  <p className="font-bold text-[#3E2723]">Achat sécurisé</p>
                  <p className="text-stone-400 text-xs">Paiement et contact direct avec l&apos;Atelier.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm bg-white/50 p-4 rounded-2xl border border-amber-100">
                <span className="text-xl">📦</span>
                <div>
                  <p className="font-bold text-[#3E2723]">Expédition soignée</p>
                  <p className="text-stone-400 text-xs">Envoi protégé ou retrait à l&apos;Atelier.</p>
                </div>
              </div>
            </div>

            {/* Bouton contact */}
            <a
              href={`mailto:contact@videgrenier-maison.fr?subject=Intéressé par : ${produit.nom}&body=Bonjour, je suis intéressé par "${produit.nom}" (réf: ${produit.id}). Prix : ${produit.prix}€. État : ${produit.etat}.`}
              className="bg-amber-700 text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-[0.3em] hover:bg-amber-600 transition shadow-lg text-center"
            >
              ✉️ Contacter l&apos;Atelier
            </a>
            <p className="text-center text-[10px] text-stone-400 mt-4 italic tracking-widest uppercase font-bold">
              Réponse assurée sous 24 heures maximum
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ProduitPage() {
  return (
    <Suspense fallback={<p className="text-center py-20 text-stone-500">Chargement...</p>}>
      <ProduitContent />
    </Suspense>
  );
}