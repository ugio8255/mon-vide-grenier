"use client";
import { useEffect, useRef, useState } from "react";
import { getProduits, Produit, saveProduits } from "../lib/produits";

export default function Admin() {
  const [produits, setProduits] = useState<Produit[]>([]);
  const [image, setImage] = useState("");
  const [nom, setNom] = useState("");
  const [categorie, setCategorie] = useState("");
  const [prix, setPrix] = useState("");
  const [etat, setEtat] = useState("Très bon état");
  const [loading, setLoading] = useState(false);
  const [edition, setEdition] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setProduits(getProduits()); }, []);

  const compresser = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const max = 400;
        let w = img.width, h = img.height;
        if (w > max) { h = h * max / w; w = max; }
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.5));
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setImage(await compresser(f));
  };

  const analyserAvecIA = async () => {
    if (!image) return;
    setLoading(true);
    alert("Début analyse...");
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: image }),
      });
      alert("Statut: " + res.status);
      const data = await res.json();
      alert("Réponse: " + JSON.stringify(data).substring(0, 200));
      if (data.nom) setNom(data.nom);
      if (data.categorie) setCategorie(data.categorie);
      if (data.prixEstime) setPrix(String(data.prixEstime));
      if (data.etat) setEtat(data.etat);
    } catch (err: any) {
      alert("Erreur: " + err.message);
    }
    setLoading(false);
  };

  const publier = () => {
    if (!nom || !categorie || !prix) return alert("Remplis tous les champs");
    const produits = getProduits();
    if (edition) {
      const idx = produits.findIndex(p => String(p.id) === edition);
     if (idx !== -1) produits[idx] = { ...produits[idx], nom, categorie, prix: Number(prix), etat, image };
    } else {
      produits.push({ id: Date.now().toString(), nom, categorie, prix: Number(prix), etat, image, quantite: 0 });
    }
    saveProduits(produits);
    setProduits(getProduits());
    setNom(""); setCategorie(""); setPrix(""); setEtat("Très bon état"); setImage(""); setEdition(null);
  };

  const editer = (p: Produit) => {
    setNom(p.nom); setCategorie(p.categorie); setPrix(String(p.prix)); setEtat(p.etat); setImage(p.image); setEdition(p.id);
  };

  const supprimer = (id: string) => {
    if (!confirm("Supprimer ce produit ?")) return;
    saveProduits(getProduits().filter(p => p.id !== id));
    setProduits(getProduits());
  };

  return (
    <main className="min-h-screen bg-[#fdf6f0] text-[#3E2723]">
      {/* Navigation */}
      <nav className="flex justify-center gap-6 py-4 bg-[#f5f0eb]">
        <a href="/" className="text-amber-900 font-bold hover:underline">Accueil</a>
        <span className="text-stone-400 font-bold">|</span>
        <a href="/boutique" className="text-amber-900 font-bold hover:underline">Boutique</a>
      </nav>

      <section className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-serif font-bold text-amber-900 text-center mb-8">Gestion de l&apos;Atelier</h1>
        <h2 className="text-xl font-bold text-amber-800 mb-4">Ajouter une pépite</h2>
        <div className="flex flex-col gap-4 mb-8">
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} hidden />
          <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full border border-dashed border-stone-300 rounded-xl p-6 bg-stone-50">
            {image ? <img src={image} alt="Aperçu" className="max-h-40 mx-auto rounded" /> : "📷 Cliquez pour ajouter une photo"}
          </button>
          <input placeholder="Nom de l'objet" value={nom} onChange={e => setNom(e.target.value)} className="border p-2 rounded" />
          <input placeholder="Catégorie" value={categorie} onChange={e => setCategorie(e.target.value)} className="border p-2 rounded" />
          <input placeholder="Prix (€)" type="number" value={prix} onChange={e => setPrix(e.target.value)} className="border p-2 rounded" />
          <select value={etat} onChange={e => setEtat(e.target.value)} className="border p-2 rounded">
            <option>Très bon état</option><option>Bon état</option><option>Dans son jus</option><option>À réparer</option>
          </select>
          <div className="flex gap-4 justify-center mt-4">
            <button onClick={analyserAvecIA} disabled={!image || loading} className="bg-red-800 text-white px-6 py-3 rounded-lg text-sm font-semibold disabled:opacity-50 shadow-md hover:bg-red-700 transition">
              {loading ? "⏳ Analyse..." : "🧠 Analyser avec l'IA"}
            </button>
            <button onClick={publier} className="bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-amber-600 transition">
              Publier la pépite
            </button>
          </div>
        </div>

        <h2 className="text-xl font-bold text-amber-800 mb-4">Produits existants</h2>
        {produits.length === 0 && <p className="text-stone-500">Aucun produit pour l&apos;instant.</p>}
        <div className="grid gap-4">
          {produits.map(p => (
            <div key={p.id} className="flex items-center justify-between bg-white p-4 rounded-xl shadow border border-amber-100">
              <div className="flex items-center gap-4">
                {p.image && <img src={p.image} className="w-16 h-16 object-cover rounded" />}
                <div><strong>{p.nom}</strong> — {p.prix}€ — {p.etat}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => editer(p)} className="text-blue-500">✏️</button>
                <button onClick={() => supprimer(p.id)} className="text-red-500">🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}