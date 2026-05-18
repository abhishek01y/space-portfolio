"use client";

import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromRight } from "@/lib/motion";

const timelineData = [
  {
    year: "2023",
    title: "Started Web Development",
    description: "Began the journey with HTML, CSS, JavaScript, and React. Built initial passion for creating digital experiences.",
  },
  {
    year: "2024",
    title: "Built Full Stack Applications",
    description: "Mastered Next.js, Node.js, and databases. Developed complex real-world platforms and improved system architecture skills.",
  },
  {
    year: "2025",
    title: "Exploring AI + 3D Web Experiences",
    description: "Integrating AI APIs, building cinematic 3D web interfaces, and optimizing application performance.",
  }
];

export const Timeline = () => {
  return (
    <section className="relative z-20 flex w-full flex-col items-center justify-center px-6 py-20 sm:px-10 lg:px-20">
      <h2 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-10">
        Experience Timeline
      </h2>
      
      <div className="relative w-full max-w-4xl mx-auto mt-10">
        <div className="absolute left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-[#7042f8] via-[#e59cff] to-transparent transform -translate-x-1/2 opacity-30" />
        
        {timelineData.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              key={index} 
              className={`relative flex items-center justify-between w-full mb-16 ${isEven ? "flex-row-reverse" : ""}`}
            >
              <div className="w-5/12" />
              
              <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[#030014] border-4 border-[#b49bff] shadow-[0_0_15px_#b49bff] z-10">
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-full h-full rounded-full bg-[#e59cff] opacity-50"
                />
              </div>

              <motion.div 
                variants={isEven ? slideInFromRight(0.2) : slideInFromLeft(0.2)}
                className="w-5/12 p-6 rounded-xl border border-[#2A0E61] bg-[#030014]/60 backdrop-blur-md shadow-[0_0_15px_rgba(112,66,248,0.1)] hover:shadow-[0_0_25px_rgba(112,66,248,0.3)] hover:border-[#b49bff] transition-all duration-300"
              >
                <span className="text-[#e59cff] font-bold text-xl block mb-2">{item.year}</span>
                <h3 className="text-white text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
