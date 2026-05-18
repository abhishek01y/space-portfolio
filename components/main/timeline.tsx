"use client";

import { motion } from "framer-motion";
import { SparklesIcon } from "@heroicons/react/24/solid";

const FOCUS_AREAS = [
  {
    status: "Active Focus",
    title: "Backend & Systems Engineering",
    description: "Developing robust server-side systems with Spring Boot, Node.js, and Express.js, while optimizing database querying and overall runtime efficiency.",
    accent: "from-purple-500 to-pink-500",
    glow: "rgba(168, 85, 247, 0.25)",
    isActive: true,
  },
  {
    status: "Active Focus",
    title: "Modern Full Stack Web Apps",
    description: "Building production-ready applications utilizing Next.js, React, TypeScript, and Tailwind CSS. Designing client routes, caching, and state systems.",
    accent: "from-cyan-500 to-blue-500",
    glow: "rgba(6, 182, 212, 0.25)",
    isActive: true,
  },
  {
    status: "Active Focus",
    title: "API Design & Storage Architecture",
    description: "Architecting consistent RESTful APIs and securing endpoint contracts. Designing database schemas with MongoDB and MySQL for highly performant read/write operations.",
    accent: "from-emerald-500 to-teal-500",
    glow: "rgba(16, 185, 129, 0.25)",
    isActive: true,
  },
  {
    status: "Exploring",
    title: "Algorithmic Problem Solving",
    description: "Strengthening core computer science fundamentals through Data Structures and Algorithms (DSA) to write clean, performant, and scale-ready code structures.",
    accent: "from-amber-500 to-orange-500",
    glow: "rgba(245, 158, 11, 0.25)",
    isActive: false,
  },
  {
    status: "Exploring",
    title: "Scalable Architecture & Design Patterns",
    description: "Studying design patterns, microservices concepts, and solid architecture guidelines to build software that is modular, maintainable, and modularly decoupled.",
    accent: "from-indigo-500 to-purple-500",
    glow: "rgba(99, 102, 241, 0.25)",
    isActive: false,
  },
  {
    status: "Active Focus",
    title: "Interactive Interfaces & UI/UX Principles",
    description: "Refining user-centric layouts and polishing typography hierarchies, interactive transitions, and responsive micro-animations for high-fidelity browser presentations.",
    accent: "from-rose-500 to-red-500",
    glow: "rgba(244, 63, 94, 0.25)",
    isActive: true,
  },
];

export const Timeline = () => {
  return (
    <section className="relative z-20 flex w-full flex-col items-center justify-center px-6 py-24 sm:px-10 lg:px-20 max-w-6xl mx-auto">
      
      {/* Upper header block */}
      <div className="flex flex-col items-center justify-center mb-16 text-center">
        <div className="Welcome-box py-[6px] px-[12px] border border-[#7042f88b] bg-[#030014]/50 opacity-[0.9] flex flex-row items-center justify-center rounded-full mb-4">
          <SparklesIcon className="text-[#b49bff] mr-[8px] h-4 w-4" />
          <span className="Welcome-text text-[11px] font-semibold tracking-wider text-purple-300 uppercase">
            Current Goals & Journey
          </span>
        </div>
        <h2 className="text-[36px] md:text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          Developer Focus
        </h2>
        <p className="text-[13px] md:text-[15px] text-gray-400 mt-2 max-w-xl font-medium">
          A realistic overview of the systems I study, technologies I master, and architectural principles I integrate.
        </p>
      </div>
      
      {/* Grid framework */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-4">
        {FOCUS_AREAS.map((area, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            style={{ shadow: `0 0 20px ${area.glow}` } as any}
            className="rounded-2xl border border-[#7042f8]/20 bg-[#030014]/55 p-6 backdrop-blur-md flex flex-col justify-between shadow-[0_0_15px_rgba(112,66,248,0.06)] hover:border-[#7042f8]/55 transition-all duration-300"
          >
            <div>
              {/* Category tag */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[9px] font-extrabold tracking-widest uppercase text-purple-400">
                  Track 0{index + 1}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-[#0c0524] border border-[#7042f8]/30 ${
                  area.isActive ? "text-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.2)]" : "text-amber-400/80"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${area.isActive ? "bg-cyan-400 animate-pulse" : "bg-amber-400"}`} />
                  {area.status}
                </span>
              </div>
              
              {/* Title & Body */}
              <h3 className="text-white text-lg font-bold tracking-wide mb-3 leading-snug">
                {area.title}
              </h3>
              <p className="text-gray-400 text-[13px] leading-relaxed font-medium">
                {area.description}
              </p>
            </div>
            
            {/* Ambient indicator accent line */}
            <div className={`w-full h-[2px] mt-6 rounded-full bg-gradient-to-r ${area.accent} opacity-40`} />
          </motion.div>
        ))}
      </div>
      
    </section>
  );
};
