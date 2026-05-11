import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#C5C9B4] text-[#3E2723] pt-16">
      {/* Navigation */}

      {/* Hero */}
      <section className="text-center py-32 px-4 bg-[#C5C9B4] min-h-[80vh] flex flex-col justify-center items-center border-none">
  <h1 className="text-8xl font-serif font-bold mb-6 text-[#3E2723] leading-tight [text-shadow:_2px_2px_4px_rgba(0,0,0,0.5)]">
  Les{" "}
  <span className="text-amber-700">Trésors</span>
  <br />
  cachés de{" "}
  <span className="text-amber-700">ma Maison</span>
</h1>
  <p className="text-lg text-amber-800 mb-3 tracking-widest uppercase mt-2">
     L&apos;Âme des Objets Retrouvés
  </p>
  <p className="text-md text-stone-900 max-w-2xl mx-auto mb-9 mt-9 leading-relaxed">
  Chineurs, amoureux du beau — bienvenue chez vous.
  <br />
  Chaque objet a une âme, trouvez la vôtre.
</p>
  <Link href="/boutique" className="inline-block w-fit mx-auto bg-amber-800 text-white px-4 py-3 rounded-full text-lg font-semibold hover:bg-amber-500 transition mt-4">
  DÉCOUVRIR LES PÉPITES
</Link>
</section>
    </main>
  );
}