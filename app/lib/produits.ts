export interface Produit {
  id: number;
  nom: string;
  categorie: string;
  prix: number;
  etat: string;
  image?: string
}

const PRODUITS_INITIAUX: Produit[] = [
  { id: 1, nom: "Vase décoratif en verre soufflé bleu", categorie: "DÉCORATION", prix: 45, etat: "Très bon état" },
  { id: 2, nom: "Montre vintage Invicta", categorie: "MÉDIA & TECH", prix: 150, etat: "Très bon état" },
  { id: 3, nom: "Trépied photo Amazon Basics", categorie: "MÉDIA & TECH", prix: 50, etat: "Très bon état" },
  { id: 4, nom: "Livre ancien relié cuir", categorie: "COLLECTION / VINTAGE", prix: 50, etat: "Dans son jus" },
  { id: 5, nom: "Petite figurine d'éléphant rose", categorie: "DÉCORATION", prix: 10, etat: "Très bon état" },
];

export function getProduits(): Produit[] {
  if (typeof window === "undefined") return PRODUITS_INITIAUX;
  const stored = localStorage.getItem("produits");
  if (!stored) {
    localStorage.setItem("produits", JSON.stringify(PRODUITS_INITIAUX));
    return PRODUITS_INITIAUX;
  }
  return JSON.parse(stored);
}

export function saveProduits(produits: Produit[]) {
  localStorage.setItem("produits", JSON.stringify(produits));
}