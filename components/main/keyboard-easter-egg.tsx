"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const KeyboardEasterEgg = () => {
  const [showUFO, setShowUFO] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const secretCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeySequence((prev) => {
        const newSequence = [...prev, e.key];
        if (newSequence.length > secretCode.length) {
          newSequence.shift();
        }
        
        if (newSequence.join("") === secretCode.join("")) {
          setShowUFO(true);
          setTimeout(() => setShowUFO(false), 5000); // Hide after 5 seconds
        }
        return newSequence;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {showUFO && (
        <motion.div
          initial={{ x: "-100vw", y: "20vh", opacity: 0 }}
          animate={{ x: "100vw", y: "10vh", opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3, ease: "linear" }}
          className="fixed z-[100] text-4xl pointer-events-none"
        >
          🛸
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[2px] h-[500px] bg-gradient-to-b from-green-500/50 to-transparent blur-sm" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
