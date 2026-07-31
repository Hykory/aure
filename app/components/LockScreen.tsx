"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Delete, Heart } from "lucide-react";
import { useEffect, useState } from "react";

type LockScreenProps = {
  passcode: string;
  recipientName: string;
  onUnlock: () => void;
  reducedMotion: boolean;
};

const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, "blank", 0, "delete"];

export function LockScreen({
  passcode,
  recipientName,
  onUnlock,
  reducedMotion,
}: LockScreenProps) {
  const [entered, setEntered] = useState("");
  const [wrongAttempt, setWrongAttempt] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (entered.length !== passcode.length) return;
    if (entered === passcode) {
      setSuccess(true);
      const timeout = window.setTimeout(onUnlock, reducedMotion ? 250 : 900);
      return () => window.clearTimeout(timeout);
    }
    setWrongAttempt((value) => value + 1);
    const timeout = window.setTimeout(() => setEntered(""), 420);
    return () => window.clearTimeout(timeout);
  }, [entered, onUnlock, passcode, reducedMotion]);

  function addDigit(digit: number) {
    if (!success && entered.length < passcode.length) {
      setEntered((value) => `${value}${digit}`);
    }
  }

  return (
    <motion.main
      className="lock-screen floral-surface"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: reducedMotion ? 1 : 1.03 }}
      aria-label="Écran de verrouillage"
    >
      <div className="corner-bloom bloom-top" aria-hidden="true" />
      <div className="corner-bloom bloom-bottom" aria-hidden="true" />
      <motion.div
        className="lock-heart"
        animate={success && !reducedMotion ? { scale: [1, 1.45, 1.2] } : {}}
        transition={{ duration: 0.8 }}
      >
        <Heart aria-hidden="true" fill="currentColor" strokeWidth={1.5} />
      </motion.div>
      <p className="lock-kicker">un petit secret pour</p>
      <h1>{recipientName}</h1>
      <p className="lock-hint">Entre notre date spéciale</p>

      <motion.div
        className="passcode-dots"
        key={wrongAttempt}
        animate={wrongAttempt && !reducedMotion ? { x: [0, -8, 8, -5, 5, 0] } : {}}
        transition={{ duration: 0.36 }}
        role="status"
        aria-label={`${entered.length} chiffres saisis sur ${passcode.length}`}
      >
        {Array.from({ length: passcode.length }, (_, index) => (
          <span className={index < entered.length ? "filled" : ""} key={index} />
        ))}
      </motion.div>

      <AnimatePresence>
        {!success && (
          <motion.div className="keypad" exit={{ opacity: 0, y: 18 }}>
            {keys.map((key, index) => {
              if (key === "blank") return <span key="blank" />;
              if (key === "delete") {
                return (
                  <button
                    className="key key-delete"
                    key="delete"
                    onClick={() => setEntered((value) => value.slice(0, -1))}
                    aria-label="Effacer le dernier chiffre"
                    type="button"
                  >
                    <Delete size={21} aria-hidden="true" />
                  </button>
                );
              }
              return (
                <motion.button
                  className="key"
                  key={key}
                  onClick={() => addDigit(Number(key))}
                  whileTap={reducedMotion ? undefined : { scale: 0.88 }}
                  aria-label={`Chiffre ${key}`}
                  type="button"
                >
                  {key}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      <p className="lock-footnote">gardé avec amour ♡</p>
    </motion.main>
  );
}
