export interface Produit {
  id: string;
  nom: string;
  categorie: string;
  prix: number;
  etat: string;
  image: string;
  quantite: number;
}

const PRODUITS_INITIAUX: Produit[] = [];

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
