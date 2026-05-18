"use client";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="w-full bg-[#5D4037] text-white py-2 border-b-2 border-amber-400 fixed top-0 left-0 z-50">
      <div className="flex items-center px-4">
        <a href="/" className="text-2xl font-serif font-bold tracking-wider flex items-center mr-16">
          <span className="text-amber-400 mr-2">◆</span> MON VIDE GRENIER
        </a>
        <div className="hidden md:flex items-center gap-14 flex-1">
          <a href="/" className="text-sm uppercase tracking-wider hover:text-amber-300 transition">Accueil</a>
          <a href="/boutique" className="text-sm uppercase tracking-wider hover:text-amber-300 transition">Boutique</a>
          <a href="/admin" className="text-sm uppercase tracking-wider hover:text-amber-300 transition">L&apos;Atelier</a>
          <a href="#" className="text-sm uppercase tracking-wider hover:text-amber-300 transition ml-auto mr-12">Contact</a>
        </div>
        <button className="md:hidden ml-auto mr-2 text-2xl" onClick={() => setOpen(!open)}>☰</button>
      </div>
      {open && (
        <div className="md:hidden flex flex-col bg-[#5D4037] px-6 py-4 gap-4 border-t border-amber-400">
          <a href="/" className="text-sm uppercase tracking-wider hover:text-amber-300 transition" onClick={() => setOpen(false)}>Accueil</a>
          <a href="/boutique" className="text-sm uppercase tracking-wider hover:text-amber-300 transition" onClick={() => setOpen(false)}>Boutique</a>
          <a href="/admin" className="text-sm uppercase tracking-wider hover:text-amber-300 transition" onClick={() => setOpen(false)}>L&apos;Atelier</a>
          <a href="#" className="text-sm uppercase tracking-wider hover:text-amber-300 transition" onClick={() => setOpen(false)}>Contact</a>
        </div>
      )}
    </nav>
  );
}