"use client";

import { Heart, Menu, RotateCcw, X } from "lucide-react";
import { useState } from "react";

type NavigationProps = {
  reducedMotion: boolean;
  onToggleMotion: () => void;
  onRelock: () => void;
};

const links = [
  ["#accueil", "Accueil"],
  ["#puzzle", "Puzzle"],
  ["#lettre", "Lettre"],
  ["#playlists", "Playlists"],
  ["#compteur", "Nous"],
];

export function Navigation({
  reducedMotion,
  onToggleMotion,
  onRelock,
}: NavigationProps) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-nav">
      <a className="nav-mark" href="#accueil" aria-label="Retour à l’accueil">
        <Heart size={17} fill="currentColor" aria-hidden="true" />
        <span>notre jardin</span>
      </a>
      <button
        className="menu-button"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="main-navigation"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav id="main-navigation" className={open ? "nav-links open" : "nav-links"}>
        {links.map(([href, label]) => (
          <a href={href} key={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <button className="nav-action" type="button" onClick={onToggleMotion}>
          {reducedMotion ? "Activer le mouvement" : "Mouvement doux"}
        </button>
        <button className="nav-action relock" type="button" onClick={onRelock}>
          <RotateCcw size={14} aria-hidden="true" /> Reverrouiller
        </button>
      </nav>
    </header>
  );
}
