"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiJavascript, 
  SiTailwindcss, 
  SiSpring, 
  SiMongodb, 
  SiMysql, 
  SiGit, 
  SiGithub, 
  SiVercel, 
  SiPostman, 
  SiNodedotjs 
} from "react-icons/si";
import { FaCloud } from "react-icons/fa6";
import { VscCode } from "react-icons/vsc";

const roles = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "Software Engineer",
  "Next.js Developer",
  "AI & ML Enthusiast",
];

interface OrbitRingProps {
  radius: number;
  duration: number;
  reverse?: boolean;
  skills: { name: string; icon: any; color: string }[];
}

const OrbitRing = ({ radius, duration, reverse = false, skills }: OrbitRingProps) => {
  return (
    <motion.div
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ repeat: Infinity, duration, ease: "linear" }}
      style={{
        width: radius * 2,
        height: radius * 2,
        borderRadius: "50%",
        border: "1px dashed rgba(112, 66, 248, 0.15)",
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {skills.map((skill, index) => {
        const angle = (index * 360) / skills.length;
        const radian = (angle * Math.PI) / 180;
        const x = radius * Math.cos(radian);
        const y = radius * Math.sin(radian);
        const Icon = skill.icon;
        
        return (
          <motion.div
            key={index}
            animate={{ rotate: reverse ? 360 : -360 }}
            transition={{ repeat: Infinity, duration, ease: "linear" }}
            style={{
              position: "absolute",
              left: `calc(50% + ${x}px - 20px)`,
              top: `calc(50% + ${y}px - 20px)`,
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: "rgba(3, 0, 20, 0.8)",
              border: "1px solid rgba(112, 66, 248, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: skill.color,
              boxShadow: `0 0 10px rgba(112, 66, 248, 0.15)`,
              cursor: "pointer",
            }}
            whileHover={{ 
              scale: 1.25, 
              borderColor: skill.color, 
              boxShadow: `0 0 18px ${skill.color}`,
              zIndex: 50 
            }}
            className="group"
          >
            <Icon size={20} />
            
            {/* Floating CSS Tooltip */}
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-[#070417] text-cyan-300 text-[10px] px-2.5 py-1 rounded border border-[#7042f8]/40 shadow-[0_0_10px_rgba(6,182,212,0.2)] whitespace-nowrap z-50 pointer-events-none transition-all duration-200">
              {skill.name}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export const HeroContent = () => {
  const [currentRole, setCurrentRole] = useState(roles[0]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % roles.length;
      setCurrentRole(roles[i]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const ring1Skills = useMemo(() => [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Spring Boot", icon: SiSpring, color: "#6DB33F" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  ], []);

  const ring2Skills = useMemo(() => [
    { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "MySQL", icon: SiMysql, color: "#00758F" },
  ], []);

  const ring3Skills = useMemo(() => [
    { name: "Git", icon: SiGit, color: "#F05032" },
    { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
    { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
    { name: "Render", icon: FaCloud, color: "#46E3B7" },
    { name: "VS Code", icon: VscCode, color: "#007ACC" },
    { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  ], []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col lg:flex-row items-center justify-center gap-10 px-6 sm:px-10 lg:px-20 mt-32 md:mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-6 justify-center m-auto text-center lg:text-start">
        {/* Luminous System Label */}
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[6px] px-[12px] border border-[#00f5d4]/40 bg-[#030014]/50 opacity-[0.9] mx-auto lg:mx-0 flex flex-row items-center justify-center rounded-full shadow-[0_0_15px_rgba(0,245,212,0.15)] w-fit"
        >
          <SparklesIcon className="text-[#00f5d4] mr-[8px] h-4 w-4 animate-spin-slow" />
          <span className="Welcome-text text-[11px] font-semibold tracking-widest text-[#00f5d4] uppercase">
            SYSTEM PROTOCOL: ACTIVE
          </span>
        </motion.div>

        {/* Luminous Name Section */}
        <motion.div
          variants={slideInFromLeft(0.3)}
          className="flex flex-col gap-2"
        >
          <h1 className="text-[44px] sm:text-[56px] lg:text-[72px] font-extrabold tracking-tight text-white leading-tight">
            Hi, I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 drop-shadow-[0_0_35px_rgba(6,182,212,0.3)]">
              Abhishek Yadav
            </span>
          </h1>
          <div className="text-base sm:text-lg md:text-xl font-bold tracking-widest text-[#b49bff] min-h-[32px] uppercase flex items-center justify-center lg:justify-start gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            <span>{currentRole}</span>
          </div>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="text-2xl sm:text-3xl font-bold text-gray-200 leading-snug"
        >
          <span>
            Building{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              scalable
            </span>{" "}
            full stack applications with AI-powered solutions.
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-base sm:text-lg text-gray-400 my-2 max-w-[650px] leading-relaxed mx-auto lg:mx-0"
        >
          Computer Science student passionate about full stack development, AI systems, and solving real-world problems through scalable software.
        </motion.p>

        <motion.div
          variants={slideInFromLeft(1)}
          className="flex flex-col sm:flex-row flex-wrap items-center gap-4 justify-center lg:justify-start mt-4"
        >
          <Link
            href="#projects"
            className="py-3 px-8 button-primary text-center text-white cursor-pointer rounded-lg w-full sm:w-auto font-medium transition-all hover:scale-105 active:scale-95 border border-transparent hover:border-[#7042f88b] shadow-[0_0_15px_rgba(113,47,255,0.15)] hover:shadow-[0_0_25px_rgba(113,47,255,0.3)]"
          >
            View Projects
          </Link>
          <Link
            href="/resume.pdf"
            target="_blank"
            className="py-3 px-8 text-center text-white cursor-pointer rounded-lg w-full sm:w-auto font-medium transition-all hover:bg-[#1a0b2e] active:scale-95 border border-[#7042f8] bg-[#030014]/50 backdrop-blur-md shadow-[0_0_10px_rgba(113,47,255,0.2)] hover:shadow-[0_0_20px_rgba(113,47,255,0.4)] hover:text-[#b49bff]"
          >
            View Resume
          </Link>
          <a
            href="/resume.pdf"
            download="Abhishek_Yadav_Resume.pdf"
            className="py-3 px-8 text-center text-white cursor-pointer rounded-lg w-full sm:w-auto font-medium transition-all hover:bg-gradient-to-r hover:from-[#7042f8]/30 hover:to-[#b49bff]/30 active:scale-95 border border-[#b49bff] bg-[#030014]/50 backdrop-blur-md shadow-[0_0_10px_rgba(180,155,255,0.2)] hover:shadow-[0_0_20px_rgba(180,155,255,0.4)]"
          >
            Download Resume
          </a>
        </motion.div>
      </div>

      {/* Orbit System Column */}
      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center relative py-12"
      >
        <div className="relative flex items-center justify-center w-[300px] h-[300px] sm:w-[480px] sm:h-[480px] overflow-visible scale-75 sm:scale-100 transition-transform duration-500 select-none">
          {/* Glowing central core */}
          <div className="w-24 h-24 rounded-full bg-[#030014] border border-[#7042f8]/40 flex items-center justify-center shadow-[0_0_40px_rgba(112,66,248,0.4)] relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 animate-pulse-slow" />
            <span className="text-cyan-400 font-extrabold tracking-widest text-[10px] animate-pulse text-center leading-none">CORE<br/>v1.0</span>
          </div>

          {/* Orbit System Rings */}
          <OrbitRing radius={75} duration={16} skills={ring1Skills} />
          <OrbitRing radius={135} duration={26} reverse skills={ring2Skills} />
          <OrbitRing radius={195} duration={36} skills={ring3Skills} />
        </div>
      </motion.div>
    </motion.div>
  );
};
