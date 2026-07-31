"use client";

import { motion } from "framer-motion";
import { ArrowDown, Heart } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

export function HeroSection({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <section className="hero section-shell" id="accueil">
      <div className="hero-flower flower-left" aria-hidden="true" />
      <div className="hero-flower flower-right" aria-hidden="true" />
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="eyebrow">{siteConfig.eyebrow}</p>
        <h1>{siteConfig.heroTitle}</h1>
        <p className="hero-message">{siteConfig.heroMessage}</p>
        <motion.div
          className="hero-heart"
          animate={reducedMotion ? undefined : { scale: [1, 1.08, 1] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          <Heart fill="currentColor" strokeWidth={1.4} aria-hidden="true" />
        </motion.div>
        <div className="hero-actions">
          <a className="primary-button" href="#puzzle">
            Commencer l’histoire <ArrowDown size={17} aria-hidden="true" />
          </a>
          <a className="text-link" href="#lettre">
            Garder un mot pour plus tard
          </a>
        </div>
      </motion.div>
      <div className="mini-note note-one">nos souvenirs</div>
      <div className="mini-note note-two">pour toujours ♡</div>
    </section>
  );
}
