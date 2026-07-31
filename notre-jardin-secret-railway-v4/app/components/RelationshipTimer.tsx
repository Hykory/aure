"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import { useRelationshipTimer } from "../hooks/useRelationshipTimer";

export function RelationshipTimer({ reducedMotion }: { reducedMotion: boolean }) {
  const elapsed = useRelationshipTimer(siteConfig.relationshipStartDate);
  const units = [
    ["jours", elapsed.days],
    ["heures", elapsed.hours],
    ["minutes", elapsed.minutes],
    ["secondes", elapsed.seconds],
  ] as const;

  return (
    <section className="timer-section" id="compteur">
      <div className="timer-bloom timer-bloom-one" aria-hidden="true" />
      <div className="timer-bloom timer-bloom-two" aria-hidden="true" />
      <motion.div
        className="timer-inner"
        initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <span className="section-number">04 · chaque instant</span>
        <h2>every second with you ♡</h2>
        <div className="timer-grid" role="timer" aria-live="off">
          {units.map(([label, value]) => (
            <div className="timer-unit" key={label}>
              <strong>{String(value).padStart(label === "jours" ? 1 : 2, "0")}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <p>{siteConfig.timerMessage}</p>
        <motion.div
          className="final-heart"
          animate={reducedMotion ? undefined : { scale: [1, 1.12, 1] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          <Heart fill="currentColor" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </section>
  );
}
