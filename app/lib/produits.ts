export interface Produit {
  id: string;
  nom: string;
  categorie: string;
  prix: number;
  etat: string;
  images?: string[];
  description?: string;
  quantite: number;
}

const PRODUITS_INITIAUX: Produit[] = [];

export function migrerProduits() {
  if (typeof window === "undefined") return;
  const stored = localStorage.getItem("produits");
  if (!stored) return;
  const produits = JSON.parse(stored);
  let modifie = false;
  produits.forEach((p: any) => {
    if (p.image && !p.images) {
      p.images = [p.image];
      delete p.image;
      modifie = true;
    }
  });
  if (modifie) {
    localStorage.setItem("produits", JSON.stringify(produits));
  }
}

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