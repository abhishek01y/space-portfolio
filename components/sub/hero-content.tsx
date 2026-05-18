"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

const roles = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "Backend Developer",
  "Next.js Developer",
  "AI & ML Enthusiast",
  "Software Engineer",
];

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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col lg:flex-row items-center justify-center gap-10 px-6 sm:px-10 lg:px-20 mt-32 md:mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-center lg:text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[12px] border border-[#7042f88b] opacity-[0.9] mx-auto lg:mx-0 flex flex-row items-center justify-center"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px] font-medium tracking-wide">
            Abhishek Yadav <span className="opacity-70 px-1">•</span> <span className="min-w-[150px] inline-block text-left transition-all duration-300">{currentRole}</span>
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-4 mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-white max-w-[700px] w-auto h-auto leading-[1.2]"
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
          className="text-base sm:text-lg text-gray-400 my-4 max-w-[650px] leading-relaxed mx-auto lg:mx-0"
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

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center"
      >
        <Image
          src="/hero-bg.svg"
          alt="work icons"
          height={650}
          width={650}
          draggable={false}
          priority
          className="select-none w-full max-w-[520px] lg:max-w-[650px] animate-pulse-slow"
        />
      </motion.div>
    </motion.div>
  );
};
