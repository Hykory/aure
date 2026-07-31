"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function FloralIntro({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.div
      className="floral-intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="intro-copy">
        <motion.div
          className="intro-heart"
          initial={{ scale: 0.6 }}
          animate={reducedMotion ? { scale: 1 } : { scale: [0.6, 1.25, 1] }}
          transition={{ duration: 1.1 }}
        >
          <Heart fill="currentColor" aria-hidden="true" />
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          Bienvenue dans notre jardin
        </motion.p>
      </div>
      {Array.from({ length: 10 }, (_, index) => (
        <motion.span
          className={`intro-bloom intro-bloom-${index + 1}`}
          key={index}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ delay: reducedMotion ? 0 : index * 0.08, duration: reducedMotion ? 0.1 : 0.9 }}
          aria-hidden="true"
        />
      ))}
    </motion.div>
  );
}
