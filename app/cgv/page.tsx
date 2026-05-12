export default function CGV() {
  return (
    <main className="min-h-screen bg-[#C5C9B4] text-[#3E2723] pt-16">
      <div className="max-w-3xl mx-auto py-16 px-4">
        <a href="/" className="inline-flex items-center text-sm text-stone-500 hover:text-amber-700 mb-8 transition-colors">
          <span className="text-xl mr-2">←</span> Retour à l&apos;accueil
        </a>
        <h1 className="text-4xl font-serif font-bold text-amber-900 mb-10">Conditions Générales de Vente</h1>
        <div className="space-y-6 text-stone-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-amber-800 mb-2">1. Objet</h2>
            <p>Les présentes CGV régissent la vente d&apos;objets d&apos;occasion proposés par Mon Vide Grenier. Toute commande implique l&apos;acceptation sans réserve de ces conditions.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-amber-800 mb-2">2. Description des objets</h2>
            <p>Les objets sont vendus d&apos;occasion, en l&apos;état, avec leurs qualités et défauts. Les photos et descriptions sont les plus fidèles possibles. L&apos;état est indiqué : Très bon état, Bon état, Dans son jus, ou À réparer.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-amber-800 mb-2">3. Prix</h2>
            <p>Tous les prix sont indiqués en euros. Les frais d&apos;expédition ne sont pas inclus et seront communiqués avant validation de la commande.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-amber-800 mb-2">4. Commande</h2>
            <p>La commande est confirmée par échange d&apos;email. Un email récapitulatif vous sera envoyé avec le détail de votre achat.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-amber-800 mb-2">5. Paiement</h2>
            <p>Le paiement s&apos;effectue par virement bancaire ou PayPal. La marchandise est réservée à réception du paiement.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-amber-800 mb-2">6. Livraison</h2>
            <p>Deux options : retrait en main propre (gratuit) ou envoi postal (frais à la charge de l&apos;acheteur). Les objets sont expédiés sous 3 jours ouvrés après réception du paiement.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-amber-800 mb-2">7. Droit de rétractation</h2>
            <p>Conformément à la loi, vous disposez d&apos;un délai de 14 jours pour vous rétracter. Les frais de retour sont à votre charge.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-amber-800 mb-2">8. Litiges</h2>
            <p>Tout litige fera l&apos;objet d&apos;une tentative de résolution à l&apos;amiable avant toute procédure judiciaire.</p>
          </section>
        </div>
      </div>
    </main>
  );
}