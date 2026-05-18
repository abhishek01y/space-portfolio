"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const GithubStats = () => {
  return (
    <section className="relative z-20 flex w-full flex-col items-center justify-center px-6 py-20 sm:px-10 lg:px-20">
      <h2 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-10">
        GitHub Contributions
      </h2>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl rounded-xl border border-[#2A0E61] bg-[#030014]/60 p-8 shadow-[0_0_20px_rgba(112,66,248,0.15)] backdrop-blur-md flex justify-center"
      >
        {/* Using a public GitHub chart API generator */}
        <div className="relative w-full overflow-x-auto overflow-y-hidden scrollbar-hidden">
          <img 
            src="https://ghchart.rshah.org/b49bff/abhishek01y" 
            alt="Abhishek Yadav's GitHub Contributions Graph" 
            className="w-full min-w-[700px] opacity-90 hover:opacity-100 transition-opacity drop-shadow-[0_0_15px_rgba(180,155,255,0.4)]"
          />
        </div>
      </motion.div>
    </section>
  );
};
