"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, LockKeyhole, MailOpen } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "../data/siteConfig";

export function LoveLetter({ unlocked, reducedMotion }: { unlocked: boolean; reducedMotion: boolean }) {
  const [opened, setOpened] = useState(false);

  return (
    <section className="content-section letter-section" id="lettre">
      <div className="section-heading">
        <span className="section-number">02 · quelques mots</span>
        <h2>for you, always ♡</h2>
        <p>Une lettre à ouvrir quand tu auras envie de te souvenir.</p>
      </div>
      {!unlocked ? (
        <div className="letter-locked" aria-live="polite">
          <LockKeyhole aria-hidden="true" />
          <h3>Cette lettre attend encore un peu.</h3>
          <p>Reconstitue notre image pour briser doucement le sceau.</p>
          <a href="#puzzle">Retourner au puzzle</a>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.button
              className="envelope"
              type="button"
              onClick={() => setOpened(true)}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.96 }}
              whileHover={reducedMotion ? undefined : { y: -5 }}
            >
              <span className="envelope-flap" aria-hidden="true" />
              <span className="wax-seal"><Heart fill="currentColor" aria-hidden="true" /></span>
              <span className="envelope-copy"><MailOpen aria-hidden="true" /> Ouvrir la lettre</span>
            </motion.button>
          ) : (
            <motion.article
              className="letter-paper"
              initial={{ opacity: 0, y: reducedMotion ? 0 : 24, rotate: reducedMotion ? 0 : -1 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="letter-date">{siteConfig.loveLetter.date}</span>
              <h3>{siteConfig.loveLetter.title}</h3>
              {siteConfig.loveLetter.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="signature">{siteConfig.loveLetter.signature}</p>
              <span className="paper-heart" aria-hidden="true">♡</span>
            </motion.article>
          )}
        </AnimatePresence>
      )}
    </section>
  );
}
