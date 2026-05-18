"use client";

import { motion } from "framer-motion";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiFramer, 
  SiThreedotjs, 
  SiSpring, 
  SiMysql, 
  SiMongodb, 
  SiFirebase, 
  SiGit, 
  SiGithub, 
  SiVercel, 
  SiPostman, 
  SiDocker 
} from "react-icons/si";
import { FaJava, FaCloud } from "react-icons/fa6";
import { TbApi } from "react-icons/tb";
import { VscCode } from "react-icons/vsc";

const SKILL_CATEGORIES = [
  {
    title: "Frontend / Client",
    accent: "from-cyan-500 to-blue-500",
    glow: "rgba(6, 182, 212, 0.2)",
    skills: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Framer Motion", icon: SiFramer, color: "#E10098" },
      { name: "Three.js", icon: SiThreedotjs, color: "#FFFFFF" },
    ]
  },
  {
    title: "Backend / Core",
    accent: "from-purple-500 to-pink-500",
    glow: "rgba(168, 85, 247, 0.2)",
    skills: [
      { name: "Java", icon: FaJava, color: "#ED8B00" },
      { name: "Spring Boot", icon: SiSpring, color: "#6DB33F" },
      { name: "REST APIs", icon: TbApi, color: "#00F5D4" },
    ]
  },
  {
    title: "Database / Storage",
    accent: "from-emerald-500 to-teal-500",
    glow: "rgba(16, 185, 129, 0.2)",
    skills: [
      { name: "MySQL", icon: SiMysql, color: "#00758F" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
    ]
  },
  {
    title: "Tools & Ecosystem",
    accent: "from-blue-500 to-indigo-500",
    glow: "rgba(59, 130, 246, 0.2)",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
      { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
      { name: "Render", icon: FaCloud, color: "#46E3B7" },
      { name: "VS Code", icon: VscCode, color: "#007ACC" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
    ]
  }
];

export const Skills = () => {
  return (
    <section
      id="skills"
      className="flex flex-col items-center justify-center gap-6 h-full relative overflow-hidden py-24 px-6 md:px-12 lg:px-24"
    >
      {/* Cinematic Top Title */}
      <div className="flex flex-col items-center justify-center z-20 mb-10 text-center">
        <h2 className="text-[36px] md:text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          Technical Toolkit
        </h2>
        <p className="text-[12px] md:text-[14px] text-purple-300/60 mt-2 max-w-lg font-medium tracking-wider uppercase">
          Clean, verified stack driving robust applications
        </p>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl z-20">
        {SKILL_CATEGORIES.map((category, catIdx) => (
          <motion.div
            key={catIdx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: catIdx * 0.15 }}
            style={{ shadow: `0 0 25px ${category.glow}` } as any}
            className="rounded-2xl border border-[#7042f8]/20 bg-[#030014]/40 p-6 backdrop-blur-lg flex flex-col gap-6 shadow-[0_0_20px_rgba(112,66,248,0.1)] hover:border-[#7042f8]/40 transition-all duration-500"
          >
            {/* Header with accent gradient indicator */}
            <div className="flex items-center gap-3 border-b border-[#2d226a]/30 pb-4">
              <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.accent} animate-pulse shadow-[0_0_8px_currentColor]`} />
              <h3 className="font-bold text-white text-lg tracking-wide">{category.title}</h3>
            </div>

            {/* Sub-grid of skills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {category.skills.map((skill, skillIdx) => {
                const IconComponent = skill.icon;
                return (
                  <motion.div
                    key={skillIdx}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-3 p-3 rounded-xl border border-[#2d226a]/30 bg-[#0a0520]/50 hover:bg-[#120836]/60 hover:border-[#7042f8]/50 shadow-[inset_0_0_10px_rgba(112,66,248,0.05)] hover:shadow-[0_0_15px_rgba(112,66,248,0.15)] transition-all duration-300 group cursor-pointer"
                  >
                    <IconComponent 
                      size={20} 
                      style={{ color: skill.color }} 
                      className="group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_currentColor] transition-all duration-300 shrink-0" 
                    />
                    <span className="text-[13px] md:text-[14px] font-medium text-purple-200/80 group-hover:text-white transition-colors duration-300 truncate">
                      {skill.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Embedded Ambient Skills Background Video */}
      <div className="w-full h-full absolute inset-0 pointer-events-none z-10 opacity-20">
        <div className="w-full h-full absolute flex items-center justify-center bg-cover">
          <video
            className="w-full h-auto object-cover min-h-full"
            preload="metadata"
            playsInline
            loop
            muted
            autoPlay
            aria-hidden="true"
          >
            <source src="/videos/skills-bg.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </section>
  );
};
