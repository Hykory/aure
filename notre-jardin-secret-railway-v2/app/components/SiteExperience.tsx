"use client";

import { AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { siteConfig } from "../data/siteConfig";
import { FloatingPetals } from "./FloatingPetals";
import { FloralIntro } from "./FloralIntro";
import { HeroSection } from "./HeroSection";
import { LockScreen } from "./LockScreen";
import { LoveLetter } from "./LoveLetter";
import { Navigation } from "./Navigation";
import { PhotoPuzzle } from "./PhotoPuzzle";
import { PlaylistGrid } from "./PlaylistGrid";
import { RelationshipTimer } from "./RelationshipTimer";

const UNLOCK_KEY = "notre-jardin-unlocked";
const PUZZLE_KEY = "notre-jardin-puzzle-complete";
const MOTION_KEY = "notre-jardin-reduced-motion";

export function SiteExperience() {
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [intro, setIntro] = useState(false);
  const [puzzleComplete, setPuzzleComplete] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const systemPrefersLess = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const storedMotion = window.localStorage.getItem(MOTION_KEY);
    setReducedMotion(storedMotion === null ? systemPrefersLess : storedMotion === "true");
    setUnlocked(window.localStorage.getItem(UNLOCK_KEY) === "true");
    setPuzzleComplete(window.localStorage.getItem(PUZZLE_KEY) === "true");
    setReady(true);
  }, []);

  const finishUnlock = useCallback(() => {
    window.localStorage.setItem(UNLOCK_KEY, "true");
    setIntro(true);
    setUnlocked(true);
    window.setTimeout(() => setIntro(false), reducedMotion ? 350 : 2300);
  }, [reducedMotion]);

  const finishPuzzle = useCallback(() => {
    window.localStorage.setItem(PUZZLE_KEY, "true");
    setPuzzleComplete(true);
  }, []);

  function toggleMotion() {
    setReducedMotion((current) => {
      window.localStorage.setItem(MOTION_KEY, String(!current));
      return !current;
    });
  }

  function relock() {
    window.localStorage.removeItem(UNLOCK_KEY);
    setUnlocked(false);
    setIntro(false);
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }

  if (!ready) return <div className="loading-screen" aria-label="Chargement" />;

  return (
    <AnimatePresence mode="wait">
      {!unlocked ? (
        <LockScreen
          key="lock"
          passcode={siteConfig.passcode}
          recipientName={siteConfig.recipientName}
          onUnlock={finishUnlock}
          reducedMotion={reducedMotion}
        />
      ) : intro ? (
        <FloralIntro key="intro" reducedMotion={reducedMotion} />
      ) : (
        <div className={reducedMotion ? "site reduced-motion" : "site"} key="site">
          <FloatingPetals reducedMotion={reducedMotion} />
          <Navigation reducedMotion={reducedMotion} onToggleMotion={toggleMotion} onRelock={relock} />
          <main>
            <HeroSection reducedMotion={reducedMotion} />
            <PhotoPuzzle completed={puzzleComplete} onComplete={finishPuzzle} reducedMotion={reducedMotion} />
            <LoveLetter unlocked={puzzleComplete} reducedMotion={reducedMotion} />
            <PlaylistGrid reducedMotion={reducedMotion} />
            <RelationshipTimer reducedMotion={reducedMotion} />
          </main>
          <footer><span>fait avec douceur</span><Heart size={13} fill="currentColor" aria-hidden="true" /><span>pour {siteConfig.recipientName}</span></footer>
        </div>
      )}
    </AnimatePresence>
  );
}
