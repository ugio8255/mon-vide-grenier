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
            { text: "Analyse cette photo d'objet. Donne UNIQUEMENT un JSON avec : nom (nom precis de l'objet), categorie (une seule categorie), prixEstime (un nombre entier en euros, sans symbole, sans fourchette), etat (parmi : Très bon état, Bon état, Dans son jus), description (2 phrases max). Exemple de prixEstime correct : 45. Exemple incorrect : 250-350€ ou 30 euros." }
          ]
        }]
      }),
    }
  );

    const data = await response.json();
  console.log("Gemini brut:", JSON.stringify(data));
  const contenu = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
  console.log("Contenu:", contenu);
  const json = JSON.parse(contenu.replace(/```json|```/g, "").trim());
  console.log("JSON final:", json);
  return NextResponse.json(json);
}