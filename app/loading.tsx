"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030014]">
      <div className="relative flex items-center justify-center">
        {/* Glowing orbit */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute h-32 w-32 rounded-full border border-t-[#b49bff] border-r-transparent border-b-transparent border-l-transparent shadow-[0_0_15px_#b49bff]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute h-40 w-40 rounded-full border border-t-transparent border-r-[#7042f8] border-b-transparent border-l-transparent shadow-[0_0_20px_#7042f8]"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute h-48 w-48 rounded-full border border-t-transparent border-r-transparent border-b-[#e59cff] border-l-transparent shadow-[0_0_15px_#e59cff]"
        />

        {/* Center core */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-16 w-16 rounded-full bg-gradient-to-tr from-[#7042f8] to-[#e59cff] blur-md"
        />
        <div className="absolute h-12 w-12 rounded-full bg-gradient-to-tr from-[#7042f8] to-[#e59cff]" />

        {/* Text */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute mt-64 text-lg font-medium tracking-[0.3em] text-[#b49bff] uppercase"
        >
          Initializing...
        </motion.div>
      </div>
    </div>
  );
}
