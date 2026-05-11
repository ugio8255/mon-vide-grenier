import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export async function POST(req: NextRequest) {
  const { imageBase64 } = await req.json();
  const base64 = imageBase64.split(",")[1];

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + OPENROUTER_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: { url: "data:image/jpeg;base64," + base64 }
            },
            {
              type: "text",
              text: "Analyse cette photo d'objet. Donne UNIQUEMENT un JSON valide avec ces 5 clés : nom (nom precis de l'objet), categorie (parmi : 📱 Tech & Multimédia, 🎮 Jeux & Jouets, 🛠️ Bricolage & Outillage, 🪑 Meubles & Déco, 👕 Vêtements & Accessoires, 📚 Livres & Médias, 🍽️ Cuisine & Art de la table, 🎵 Musique & Instruments, 🚲 Sport & Loisirs, 🌿 Jardin & Extérieur, 💎 Bijoux & Montres, 🧸 Enfants & Puériculture, 🎨 Art & Collection), prixEstime (nombre entier en euros), etat (parmi : Très bon état, Bon état, Dans son jus), description (2 phrases décrivant l'objet, son usage, son charme)."
            }
          ]
        }
      ]
    }),
  });

  const data = await response.json();
  console.log("📝 DEBUG OPENROUTER:", JSON.stringify(data).substring(0, 500));
  const contenu = data.choices?.[0]?.message?.content || "{}";
  console.log("📝 CONTENU BRUT:", contenu.substring(0, 500));
  const cleaned = contenu.replace(/```json|```/g, "").trim();
  let json;
try {
  json = JSON.parse(cleaned);
} catch {
  // Si le parsing échoue, on nettoie plus agressivement
  const ultraClean = cleaned.replace(/[\n\r]/g, "").replace(/\\/g, "");
  json = JSON.parse(ultraClean);
}
  return NextResponse.json(json);
}