"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProduits, Produit } from "../../lib/produits";

export default function ProduitDetail() {
  const params = useParams();
  const [produit, setProduit] = useState<Produit | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const produits = getProduits();
    const trouve = produits.find(p => String(p.id) === params.id);
    setProduit(trouve || null);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F5EDE6] flex items-center justify-center">
        <p className="text-xl text-stone-500">Chargement...</p>
      </main>
    );
  }

  if (!produit) {
    return (
      <main className="min-h-screen bg-[#F5EDE6] flex items-center justify-center">
        <p className="text-2xl text-stone-500">Produit introuvable</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#C5C9B4] text-[#3E2723]">
      <div className="max-w-5xl mx-auto py-10 px-4">
        <a
          href="/boutique"
          className="inline-flex items-center gap-2 text-amber-800 hover:text-amber-600 font-medium mb-8 transition-colors"
        >
          <span className="text-xl">←</span> Retour à la collection
        </a>

        <div className="bg-[#FDF8F4] backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-amber-100 mb-10">
          <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">
            {produit.categorie}
          </span>
          <h1 className="text-4xl font-serif font-bold text-amber-900 mb-3">{produit.nom}</h1>
          <div className="flex items-center gap-6 text-lg">
            <span className="text-3xl font-bold text-amber-700">{produit.prix}€</span>
            <span className="text-stone-400">|</span>
            <span className={`px-4 py-1 rounded-full text-sm font-medium ${
              produit.etat === "Très bon état" ? "bg-green-100 text-green-800" :
              produit.etat === "Bon état" ? "bg-blue-100 text-blue-800" :
              produit.etat === "Dans son jus" ? "bg-amber-100 text-amber-800" :
              "bg-red-100 text-red-800"
            }`}>
              {produit.etat}
            </span>
          </div>
        </div>

        {produit.images && produit.images.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-amber-900 mb-5">
              📷 Photos
              {produit.images && produit.images.length >= 2 && (
                <span className="text-lg font-normal text-stone-500 ml-1">({produit.images.length})</span>
              )}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {produit.images.map((img, i) => (
                <div key={i} className="group relative overflow-hidden rounded-xl shadow-md border-2 border-amber-100 hover:border-amber-400 transition-all bg-[#FDF8F4]">
                  <div className="aspect-square w-full flex items-center justify-center p-2 bg-transparent">
                    <img
                      src={img}
                      alt={`${produit.nom} - Photo ${i+1}`}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                    <span className="text-white text-xs font-medium">Photo {i+1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-amber-900 mb-5">L&apos;histoire de l&apos;objet</h2>
          {produit.description ? (
            <div className="bg-[#FDF8F4] p-8 rounded-2xl shadow-md border border-amber-100 text-stone-700 leading-relaxed text-lg">
              {produit.description}
            </div>
          ) : (
            <div className="bg-amber-50 p-8 rounded-2xl border border-amber-200 text-center">
              <p className="text-stone-500 italic text-lg">✨ Aucune description pour cet objet — son histoire reste à écrire.</p>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#FDF8F4] p-6 rounded-2xl shadow-md border border-amber-100">
            <h3 className="font-bold text-amber-900 text-lg mb-2">🔒 Achat sécurisé</h3>
            <p className="text-stone-600">Paiement et contact direct avec l&apos;Atelier.</p>
          </div>
          <div className="bg-[#FDF8F4] p-6 rounded-2xl shadow-md border border-amber-100">
            <h3 className="font-bold text-amber-900 text-lg mb-2">📦 Expédition soignée</h3>
            <p className="text-stone-600">Envoi protégé ou retrait à l&apos;Atelier.</p>
          </div>
        </div>
      </div>
    </main>
  );
}