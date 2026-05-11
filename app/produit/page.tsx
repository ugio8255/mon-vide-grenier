"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Produit } from "../lib/produits";
import { Suspense } from "react";

function ProduitContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [produit, setProduit] = useState<Produit | null>(null);

  useEffect(() => {
    if (!id) return;
    const stored = localStorage.getItem("produits");
    if (!stored) return;
    const produits: Produit[] = JSON.parse(stored);
    const trouve = produits.find(p => String(p.id) === id);
    setProduit(trouve || null);
  }, [id]);

  if (!id) return <p className="text-center py-20 text-stone-500">Aucun produit spécifié.</p>;
  if (!produit) return <p className="text-center py-20 text-stone-500">Produit introuvable.</p>;

  return (
    <main className="min-h-screen bg-[#C5C9B4] text-[#3E2723] pt-16">
      <div className="max-w-5xl mx-auto py-10 px-4">
        <a href="/boutique" className="inline-flex items-center gap-2 text-amber-800 hover:text-amber-600 font-medium mb-8">
          ← Retour à la collection
        </a>
        <div className="bg-[#EDE0D4] rounded-2xl p-8 shadow-lg border border-amber-100 mb-10">
          <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold uppercase px-3 py-1 rounded-full mb-3">{produit.categorie}</span>
          <h1 className="text-4xl font-serif font-bold text-amber-900 mb-3">{produit.nom}</h1>
          <div className="flex items-center gap-6 text-lg">
            <span className="text-3xl font-bold text-amber-700">{produit.prix}€</span>
            <span className="text-stone-400">|</span>
            <span className="px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">{produit.etat}</span>
          </div>
        </div>
        {produit.images && produit.images.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-amber-900 mb-5">Photos ({produit.images.length})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {produit.images.map((img, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md border-2 border-amber-100 overflow-hidden">
                  <img src={img} alt={`${produit.nom} - Photo ${i+1}`} className="w-full h-64 object-contain" />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-center">
          <a href={`mailto:contact@monvidegrenier.fr?subject=Intéressé par : ${produit.nom}&body=Bonjour, je suis intéressé par "${produit.nom}" (réf: ${produit.id}).`} className="bg-amber-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-600 transition shadow-lg">
            📧 Contacter le vendeur
          </a>
        </div>
      </div>
    </main>
  );
}

export default function ProduitPage() {
  return (
    <Suspense fallback={<p className="text-center py-20">Chargement...</p>}>
      <ProduitContent />
    </Suspense>
  );
}
