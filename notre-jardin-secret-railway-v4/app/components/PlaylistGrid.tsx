"use client";

import { motion } from "framer-motion";
import { ExternalLink, Music2, Play } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

export function PlaylistGrid({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <section className="content-section playlist-section" id="playlists">
      <div className="section-heading">
        <span className="section-number">03 · notre bande-son</span>
        <h2>our little playlists ♡</h2>
        <p>Des chansons pour retrouver un instant, une route ou un sourire.</p>
      </div>
      <div className="playlist-grid">
        {siteConfig.playlists.map((playlist, index) => (
          <motion.a
            href={playlist.url}
            target="_blank"
            rel="noreferrer"
            className={`playlist-card theme-${playlist.theme}`}
            key={playlist.title}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: reducedMotion ? 0 : index * 0.08 }}
            whileHover={reducedMotion ? undefined : { y: -6 }}
            aria-label={`Ouvrir la playlist ${playlist.title} sur Spotify`}
          >
            <div className="playlist-cover">
              <span>{playlist.cover}</span>
              <Music2 aria-hidden="true" />
              <div className="cover-rings" aria-hidden="true" />
            </div>
            <div className="playlist-copy">
              <span className="playlist-label">playlist · pour nous</span>
              <h3>{playlist.title}</h3>
              <p>{playlist.description}</p>
              <span className="spotify-link">Écouter <ExternalLink size={14} aria-hidden="true" /></span>
            </div>
            <span className="play-button"><Play fill="currentColor" aria-hidden="true" /></span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
