"use client";
import { useEffect, useRef, useState } from "react";
import { Produit } from "../lib/produits";

export default function Admin() {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [nom, setNom] = useState("");
  const [categorie, setCategorie] = useState("");
  const [prix, setPrix] = useState("");
  const [etat, setEtat] = useState("Très bon état");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [edition, setEdition] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("produits");
      if (stored) setProduits(JSON.parse(stored));
    } catch {
      setProduits([]);
    }
  }, []);

  const compresser = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(objectUrl);
        const canvas = document.createElement("canvas");
        const max = 400;
        let w = img.width, h = img.height;
        if (w > max) { h = h * max / w; w = max; }
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.5));
      };
      img.src = objectUrl;
    });
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const compressed = await compresser(f);
    setImages(prev => [...prev, compressed]);
  };

  const analyserAvecIA = async () => {
    if (images.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: images[0] }),
      });
      const data = await res.json();
      if (data.nom) setNom(data.nom);
      if (data.categorie) setCategorie(data.categorie);
      if (data.prixEstime) setPrix(String(data.prixEstime));
      if (data.etat) setEtat(data.etat);
      if (data.description) setDescription(data.description);
        } catch (err) {
      if (err instanceof Error) {
        console.error("Erreur :", err.message);
      }
    }
    setLoading(false);
  };

  const publier = () => {
    if (!nom || !categorie || !prix) return alert("Remplis tous les champs");
    const produits = JSON.parse(localStorage.getItem("produits") || "[]");
    if (edition) {
      const idx = produits.findIndex((p: Produit) => String(p.id) === edition);
      if (idx !== -1) {
        produits[idx] = { ...produits[idx], nom, categorie, prix: Number(prix), etat, images: [...images], description };
      }
    } else {
      produits.push({ id: Date.now().toString(), nom, categorie, prix: Number(prix), etat, images: [...images], description, quantite: 0 });
    }
    localStorage.setItem("produits", JSON.stringify(produits));
    setProduits(produits);
    setNom(""); setCategorie(""); setPrix(""); setEtat("Très bon état"); setImages([]); setDescription(""); setEdition(null);
  };

  const editer = (p: Produit) => {
    setNom(p.nom);
    setCategorie(p.categorie);
    setPrix(String(p.prix));
    setEtat(p.etat);
    setImages(p.images || []);
    setDescription(p.description || "");
    setEdition(p.id);
  };

  const supprimer = (id: string) => {
    if (!confirm("Supprimer ce produit ?")) return;
    const produits = JSON.parse(localStorage.getItem("produits") || "[]").filter((p: Produit) => p.id !== id);
    localStorage.setItem("produits", JSON.stringify(produits));
    setProduits(produits);
  };

  return (
    <main className="min-h-screen bg-[#C5C9B4] text-[#3E2723] pt-16">
      <section className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-serif font-bold text-amber-900 text-center mb-8">Gestion de l&apos;Atelier</h1>
        <h2 className="text-xl font-bold text-amber-800 mb-4">Ajouter une pépite</h2>
        <div className="flex flex-col gap-4 mb-8">
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} hidden multiple />
          <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full max-w-md mx-auto border border-dashed border-stone-300 rounded-xl p-6 bg-[#E5D5C8] hover:bg-[#EDE0D4] hover:border-amber-400 cursor-pointer transition shadow-lg">
            📷 Cliquez pour ajouter des photos
          </button>
          {images.length > 0 && (
            <div className="flex gap-2 flex-wrap justify-center mt-2">
              {images.map((img, i) => (
                <div key={i} className="relative">
                  <img src={img} alt={`Photo ${i+1}`} className="h-20 w-20 object-cover rounded" />
                  <button onClick={() => setImages(prev => prev.filter((_, j) => j !== i))} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">✕</button>
                </div>
              ))}
            </div>
          )}
          <input placeholder="Nom de l'objet" value={nom} onChange={e => setNom(e.target.value)} className="border p-2 rounded" />
          <textarea
            placeholder="Description, histoire de l'objet..."
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="border p-2 rounded h-24"
          />
          <select value={categorie} onChange={e => setCategorie(e.target.value)} className="border p-2 rounded">
            <option value="">-- Choisir une catégorie --</option>
            <option>📱 Tech & Multimédia</option>
            <option>🎮 Jeux & Jouets</option>
            <option>🛠️ Bricolage & Outillage</option>
            <option>🪑 Meubles & Déco</option>
            <option>👕 Vêtements & Accessoires</option>
            <option>📚 Livres & Médias</option>
            <option>🍽️ Cuisine & Art de la table</option>
            <option>🎵 Musique & Instruments</option>
            <option>🚲 Sport & Loisirs</option>
            <option>🌿 Jardin & Extérieur</option>
            <option>💎 Bijoux & Montres</option>
            <option>🧸 Enfants & Puériculture</option>
            <option>🎨 Art & Collection</option>
          </select>
          <input placeholder="Prix (€)" type="number" value={prix} onChange={e => setPrix(e.target.value)} className="border p-2 rounded" />
          <select value={etat} onChange={e => setEtat(e.target.value)} className="border p-2 rounded">
            <option>Très bon état</option>
            <option>Bon état</option>
            <option>Dans son jus</option>
            <option>À réparer</option>
          </select>
          <div className="flex gap-4 justify-center mt-4">
            <button onClick={analyserAvecIA} disabled={images.length === 0 || loading} className="bg-red-800 text-white px-6 py-3 rounded-lg text-sm font-semibold disabled:opacity-50 shadow-md hover:bg-red-700 transition">
              {loading ? "⏳ Analyse..." : "🧠 Analyser avec l'IA"}
            </button>
             {images.length > 1 && (
              <p className="text-xs text-stone-400 text-center -mt-2">L'IA analyse uniquement la première photo</p>
            )}
            <button onClick={publier} className="bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-amber-600 transition">
              Publier la pépite
            </button>
          </div>
        </div>

        <h2 className="text-xl font-bold text-amber-800 mb-4">Produits existants</h2>
        {produits.length === 0 && <p className="text-stone-500">Aucun produit pour l&apos;instant.</p>}
        <div className="grid gap-4">
          {produits.map(p => (
            <div key={p.id} className="flex items-center justify-between bg-[#EDE0D4] p-4 rounded-xl shadow border border-amber-100">
              <div className="flex items-center gap-4">
                <div className="relative">
                  {p.images && p.images.length > 0 && (
                    <img src={p.images[0]} className="w-16 h-16 object-cover rounded" />
                  )}
                  {p.images && p.images.length >= 2 && (
                    <span className="absolute top-0 -right-1 bg-amber-800 text-amber-50 text-[10px] font-medium px-1.5 py-0.5 rounded-full shadow-sm">
                      {p.images.length}
                    </span>
                  )}
                </div>
                <div><a href={`/produit?id=${p.id}`} className="hover:underline"><strong>{p.nom}</strong></a> — {p.prix}€ — {p.etat}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => editer(p)} className="text-blue-500" aria-label="Modifier">✏️</button>
<button onClick={() => supprimer(p.id)} className="text-red-500" aria-label="Supprimer">🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}