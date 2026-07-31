"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Eye, Heart, RotateCcw, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { siteConfig } from "../data/siteConfig";
import { isPuzzleSolved, shuffleTiles, swapTiles } from "../utils/puzzle";

type PhotoPuzzleProps = {
  completed: boolean;
  onComplete: () => void;
  reducedMotion: boolean;
};

export function PhotoPuzzle({ completed, onComplete, reducedMotion }: PhotoPuzzleProps) {
  const [tiles, setTiles] = useState<number[]>(() => shuffleTiles());
  const [selected, setSelected] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [showOriginal, setShowOriginal] = useState(false);
  const [justSolved, setJustSolved] = useState(false);
  const progress = useMemo(
    () => tiles.filter((tile, index) => tile === index).length,
    [tiles],
  );

  useEffect(() => {
    if (moves > 0 && isPuzzleSolved(tiles)) {
      setJustSolved(true);
      onComplete();
    }
  }, [moves, onComplete, tiles]);

  function selectTile(index: number) {
    if (justSolved) return;
    if (selected === null) {
      setSelected(index);
      return;
    }
    if (selected === index) {
      setSelected(null);
      return;
    }
    setTiles((current) => swapTiles(current, selected, index));
    setSelected(null);
    setMoves((value) => value + 1);
  }

  function reshuffle() {
    setTiles(shuffleTiles());
    setMoves(0);
    setSelected(null);
    setJustSolved(false);
  }

  const imageStyle = siteConfig.puzzleImage
    ? { backgroundImage: `url(${siteConfig.puzzleImage})` }
    : undefined;

  return (
    <section className="content-section puzzle-section" id="puzzle">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <span className="section-number">01 · un souvenir</span>
        <h2>solve our little picture ♡</h2>
        <p>Choisis deux tuiles pour les échanger. La lettre s’ouvre lorsque l’image est complète.</p>
      </motion.div>

      <div className="puzzle-card">
        <div className="puzzle-toolbar">
          <div>
            <span>{moves} mouvement{moves === 1 ? "" : "s"}</span>
            <strong>{progress}/16 bien placées</strong>
          </div>
          <div className="puzzle-tools">
            <button type="button" onClick={() => setShowOriginal(true)}>
              <Eye size={16} aria-hidden="true" /> Originale
            </button>
            <button type="button" onClick={reshuffle}>
              <RotateCcw size={16} aria-hidden="true" /> Mélanger
            </button>
          </div>
        </div>
        <div
          className="puzzle-grid"
          role="group"
          aria-label="Puzzle photo de seize tuiles"
        >
          {tiles.map((tile, index) => {
            const x = (tile % 4) * 33.333;
            const y = Math.floor(tile / 4) * 33.333;
            return (
              <motion.button
                layout={!reducedMotion}
                type="button"
                className={`puzzle-tile ${selected === index ? "selected" : ""}`}
                key={tile}
                onClick={() => selectTile(index)}
                style={{
                  ...imageStyle,
                  backgroundPosition: `${x}% ${y}%`,
                }}
                aria-label={`Tuile ${index + 1}${selected === index ? ", sélectionnée" : ""}`}
                aria-pressed={selected === index}
                whileTap={reducedMotion ? undefined : { scale: 0.96 }}
              >
                {!siteConfig.puzzleImage && <span>{tile + 1}</span>}
              </motion.button>
            );
          })}
        </div>
        <div className="progress-track" aria-hidden="true">
          <motion.span animate={{ width: `${(progress / 16) * 100}%` }} />
        </div>
        <AnimatePresence>
          {(justSolved || completed) && (
            <motion.div
              className="success-note"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Heart fill="currentColor" aria-hidden="true" />
              <div><strong>Tu l’as reconstituée.</strong><span>La lettre est maintenant ouverte.</span></div>
              <a href="#lettre">Lire la lettre</a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showOriginal && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowOriginal(false)}>
            <motion.div className="original-modal" initial={{ scale: reducedMotion ? 1 : 0.94 }} animate={{ scale: 1 }} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Image originale du puzzle">
              <button type="button" onClick={() => setShowOriginal(false)} aria-label="Fermer"><X /></button>
              <div className="original-picture" style={imageStyle}>
                {!siteConfig.puzzleImage && <span>Votre photo ici</span>}
              </div>
              <p>{siteConfig.puzzleImageAlt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
