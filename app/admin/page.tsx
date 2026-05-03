"use client";

import { useState, useEffect, useRef } from "react";
import { getProduits, saveProduits, Produit } from "../lib/produits";

export default function AdminAtelier() {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [nom, setNom] = useState("");
  const [categorie, setCategorie] = useState("");
  const [prix, setPrix] = useState("");
  const [etat, setEtat] = useState("Très bon état");
  const [image, setImage] = useState("");
  const [edition, setEdition] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setProduits(getProduits());
  }, []);

  const supprimer = (id: number) => {
    if (window.confirm("Supprimer cette pépite ?")) {
      const updated = produits.filter((p) => p.id !== id);
      setProduits(updated);
      saveProduits(updated);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new (window as any).Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxW = 400;
        const scale = maxW / img.width;
        canvas.width = maxW;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx!.fillStyle = "#FFFFFF";
        ctx!.fillRect(0, 0, canvas.width, canvas.height);
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        setImage(canvas.toDataURL("image/jpeg", 0.5));
      };
    };
    reader.readAsDataURL(file);
  };

  const analyserAvecIA = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: image }),
      });
      const data = await res.json();
      if (data.nom) setNom(data.nom);
      if (data.categorie) setCategorie(data.categorie);
      if (data.prixEstime) setPrix(String(data.prixEstime));
      if (data.etat) setEtat(data.etat);
    } catch (err) {
      alert("Erreur IA");
    }
    setLoading(false);
  };

  const publier = () => {
    if (!nom || !categorie || !prix) { alert("Remplis tous les champs !"); return; }
    let updated: Produit[];
    if (edition !== null) {
      updated = produits.map((p) => p.id === edition ? { ...p, nom, categorie, prix: Number(prix), etat, image } : p);
      setEdition(null);
    } else {
      updated = [...produits, { id: Date.now(), nom, categorie, prix: Number(prix), etat, image }];
    }
    setProduits(updated);
    saveProduits(updated);
    setNom(""); setCategorie(""); setPrix(""); setEtat("Très bon état"); setImage("");
  };

  const editer = (p: Produit) => {
    setNom(p.nom); setCategorie(p.categorie); setPrix(String(p.prix)); setEtat(p.etat); setImage(p.image || ""); setEdition(p.id);
  };

  return (
    <main className="min-h-screen bg-[#fdf6f0] text-[#3E2723]">
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-amber-900 text-center mb-8">Gestion de l'Atelier</h1>

        <div className="bg-white rounded-2xl shadow-md p-6 mb-10 border border-amber-200">
          <h2 className="text-lg font-bold text-amber-800 mb-4">{edition !== null ? "Modifier" : "Ajouter une pépite"}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-stone-500 uppercase font-bold block mb-1">Nom de l'objet</label>
              <input placeholder="ex: Vase en verre" value={nom} onChange={(e) => setNom(e.target.value)} className="border p-2 rounded-lg w-full" />
            </div>
            <div>
              <label className="text-xs text-stone-500 uppercase font-bold block mb-1">Catégorie</label>
              <input placeholder="ex: Décoration" value={categorie} onChange={(e) => setCategorie(e.target.value)} className="border p-2 rounded-lg w-full" />
            </div>
            <div>
              <label className="text-xs text-stone-500 uppercase font-bold block mb-1">Prix (€)</label>
              <input type="number" placeholder="ex: 45" value={prix} onChange={(e) => setPrix(e.target.value)} className="border p-2 rounded-lg w-full" />
            </div>
            <div>
              <label className="text-xs text-stone-500 uppercase font-bold block mb-1">État</label>
              <select value={etat} onChange={(e) => setEtat(e.target.value)} className="border p-2 rounded-lg w-full">
                <option>Très bon état</option>
                <option>Bon état</option>
                <option>Dans son jus</option>
                <option>À réparer</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full border border-dashed border-stone-300 rounded-xl p-6 bg-stone-50">
              {image ? <img src={image} className="h-32 mx-auto rounded-lg object-cover" /> : <span className="text-stone-400">📷 Cliquez pour ajouter une photo</span>}
            </button>
          </div>

          <div className="flex flex-col items-center gap-5 mt-4">
            <button onClick={analyserAvecIA} disabled={!image || loading} className="bg-red-800 text-white px-6 py-3 rounded-lg text-sm font-semibold disabled:opacity-50 shadow-md hover:bg-red-700 transition">
              {loading ? "⏳ Analyse..." : "🧠 Analyser avec l'IA"}
            </button>

            <button onClick={publier} className="bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-amber-600 transition">
              {edition !== null ? "💾 Mettre à jour" : "✨ Publier la pépite"}
            </button>
          </div>

          {edition !== null && (
            <button onClick={() => { setNom(""); setCategorie(""); setPrix(""); setEtat("Très bon état"); setImage(""); setEdition(null); }} className="ml-3 mt-2 underline text-sm">
              Annuler
            </button>
          )}
        </div>

        {produits.map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center mb-3">
            <div className="flex items-center gap-4">
              {p.image ? <img src={p.image} className="w-14 h-14 rounded-lg object-cover" /> : <div className="w-14 h-14 bg-stone-200 rounded-lg flex items-center justify-center">📷</div>}
              <div><p className="font-semibold">{p.nom}</p><p className="text-xs text-stone-400">{p.categorie} • {p.prix}€ • {p.etat}</p></div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => editer(p)} className="text-blue-500 text-sm">✏️</button>
              <button onClick={() => supprimer(p.id)} className="text-red-500 text-sm">🗑️</button>
            </div>
          </div>
        ))}
        {produits.length === 0 && <p className="text-center text-stone-400 py-8">Aucun produit.</p>}
      </section>
    </main>
  );
}