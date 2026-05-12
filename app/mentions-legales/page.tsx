export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-[#C5C9B4] text-[#3E2723] pt-16">
      <div className="max-w-3xl mx-auto py-16 px-4">
        <a href="/" className="inline-flex items-center text-sm text-stone-500 hover:text-amber-700 mb-8 transition-colors">
          <span className="text-xl mr-2">←</span> Retour à l&apos;accueil
        </a>
        
        <h1 className="text-4xl font-serif font-bold text-amber-900 mb-10">Mentions légales</h1>
        
        <div className="space-y-8 text-stone-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-amber-800 mb-3">1. Éditeur du site</h2>
            <p>Le site <strong>Mon Vide Grenier</strong> est édité par :</p>
            <p className="mt-2">Giovanni Usaï</p>
            <p>Email : contact@videgrenier-maison.fr</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-800 mb-3">2. Hébergement</h2>
            <p>Le site est hébergé par :</p>
            <p className="mt-2"><strong>GitHub Pages</strong></p>
            <p>88 Colin P Kelly Jr Street</p>
            <p>San Francisco, CA 94107</p>
            <p>États-Unis</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-800 mb-3">3. Propriété intellectuelle</h2>
            <p>L&apos;ensemble du contenu du site (textes, photographies, logos) est la propriété exclusive de Mon Vide Grenier. Toute reproduction, même partielle, est interdite sans autorisation préalable.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-800 mb-3">4. Données personnelles</h2>
            <p>Le site Mon Vide Grenier ne collecte aucune donnée personnelle sans votre consentement. Les informations transmises via le formulaire de contact sont uniquement utilisées pour répondre à votre demande.</p>
            <p className="mt-2">Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Pour l&apos;exercer, contactez-nous à : contact@videgrenier-maison.fr</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-800 mb-3">5. Cookies</h2>
            <p>Ce site n&apos;utilise pas de cookies de tracking. Seuls des cookies techniques nécessaires au fonctionnement du site peuvent être utilisés.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-amber-800 mb-3">6. Responsabilité</h2>
            <p>Mon Vide Grenier s&apos;efforce de fournir des informations exactes et à jour. Toutefois, nous ne pouvons garantir l&apos;exactitude ou l&apos;exhaustivité des informations présentes sur le site.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
