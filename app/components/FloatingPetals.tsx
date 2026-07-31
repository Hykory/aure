"use client";

import { motion } from "framer-motion";

const petals = [
  { left: "8%", delay: 0, duration: 15 },
  { left: "24%", delay: 4, duration: 18 },
  { left: "51%", delay: 2, duration: 16 },
  { left: "73%", delay: 7, duration: 19 },
  { left: "91%", delay: 1, duration: 17 },
];

export function FloatingPetals({ reducedMotion }: { reducedMotion: boolean }) {
  if (reducedMotion) return null;
  return (
    <div className="petal-field" aria-hidden="true">
      {petals.map((petal, index) => (
        <motion.span
          className="floating-petal"
          key={petal.left}
          style={{ left: petal.left }}
          initial={{ y: "-8vh", opacity: 0, rotate: index * 30 }}
          animate={{
            y: "108vh",
            opacity: [0, 0.5, 0.35, 0],
            rotate: index % 2 ? 250 : -220,
            x: [0, 22, -16, 10],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
