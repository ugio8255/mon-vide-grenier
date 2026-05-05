export default function Home() {
  return (
    <main className="min-h-screen bg-[#fdf6f0] text-[#3E2723]">
      {/* Navigation */}
      {/* Navigation */}
<nav className="flex justify-center gap-6 py-4 bg-[#f5f0eb]">
  <a href="/boutique" className="text-amber-900 font-bold hover:underline">Boutique</a>
  <span className="text-stone-400 font-bold">|</span>
  <a href="/admin" className="text-amber-900 font-bold hover:underline">Atelier</a>
</nav>

      {/* Hero */}
      <section className="text-center py-24 px-4 bg-gradient-to-b from-amber-50 to-[#fdf6f0]">
        <h1 className="text-5xl font-serif font-bold text-amber-900 mb-4">
          Mon Vide Grenier
        </h1>
        <p className="text-xl text-amber-700 mb-2">
          Les Trésors cachés de ma Maison
        </p>
        <p className="text-lg text-stone-500 max-w-2xl mx-auto mb-8">
          Chineurs, amoureux du beau — bienvenue chez vous. Chaque objet a une âme, trouvez la vôtre.
        </p>
        <a href="/boutique" className="inline-block bg-amber-800 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-amber-700 transition">
          DÉCOUVRIR LES PÉPITES
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-stone-800 text-stone-300 py-12 px-4 text-center">
        <p className="font-serif text-amber-400 text-lg mb-2">Mon Vide Grenier</p>
        <p className="text-sm mb-4">
          Donner une seconde vie aux objets qui ont une âme.
        </p>
        <p className="text-xs text-stone-500">
          Situé en France • contact@monvidegrenier.fr
        </p>
      </footer>
    </main>
  );
}