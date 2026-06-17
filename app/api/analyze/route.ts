import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  const { imageBase64 } = await req.json();
  const base64 = imageBase64.split(",")[1];

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + GEMINI_API_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [
            { inlineData: { mimeType: "image/jpeg", data: base64 } },
            { text: "Analyse cette photo d'objet d'occasion. Donne UNIQUEMENT un JSON valide avec ces 5 clés : nom (nom precis de l'objet en français), categorie (parmi strictement : Tech & Multimédia, Jeux & Jouets, Bricolage & Outillage, Meubles & Déco, Vêtements & Accessoires, Livres & Médias, Cuisine & Art de la table, Musique & Instruments, Sport & Loisirs, Jardin & Extérieur, Bijoux & Montres, Enfants & Puériculture, Art & Collection), prixEstime (nombre entier réaliste pour de l'occasion, pas le prix neuf), etat (parmi : Très bon état, Bon état, Dans son jus, À réparer), description (2 phrases décrivant l'objet)." }
          ]
        }]
      }),
    }
  );

  const data = await response.json();
  console.log("GEMINI STATUS:", response.status);
  console.log("GEMINI DATA:", JSON.stringify(data).substring(0, 300));
  const contenu = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
  const cleaned = contenu.replace(/```json|```/g, "").trim();
  const json = JSON.parse(cleaned);
  return NextResponse.json(json);
}
