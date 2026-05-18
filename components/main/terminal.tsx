"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const commands = [
  { cmd: "whoami", output: "Abhishek Yadav" },
  { cmd: "skills", output: "Next.js, React, TypeScript, Java, Spring Boot, PostgreSQL, MongoDB, AI Systems" },
  { cmd: "currently_building", output: "Immersive full stack applications with cinematic 3D web experiences" },
];

export const Terminal = () => {
  const [history, setHistory] = useState<{ cmd: string; output: string }[]>([]);
  const [currentCmdIndex, setCurrentCmdIndex] = useState(0);
  const [typingCommand, setTypingCommand] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    if (currentCmdIndex >= commands.length) return;

    const current = commands[currentCmdIndex];

    if (!showOutput) {
      if (typingCommand.length < current.cmd.length) {
        const timeout = setTimeout(() => {
          setTypingCommand(current.cmd.substring(0, typingCommand.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setShowOutput(true);
        }, 500);
        return () => clearTimeout(timeout);
      }
    } else {
      const timeout = setTimeout(() => {
        setHistory((prev) => [...prev, current]);
        setTypingCommand("");
        setShowOutput(false);
        setCurrentCmdIndex((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [typingCommand, showOutput, currentCmdIndex]);

  return (
    <section className="relative z-20 w-full px-6 py-20 sm:px-10 lg:px-20 flex justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl rounded-xl border border-[#2A0E61] bg-[#030014]/90 shadow-[0_0_30px_rgba(112,66,248,0.15)] overflow-hidden backdrop-blur-md"
      >
        <div className="flex items-center px-4 py-3 bg-[#110729] border-b border-[#2A0E61]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="mx-auto text-xs text-gray-400 font-mono">abhishek@developer:~</div>
        </div>
        
        <div className="p-6 font-mono text-sm sm:text-base min-h-[300px]">
          {history.map((item, i) => (
            <div key={i} className="mb-4">
              <div className="flex text-green-400 gap-2">
                <span className="text-purple-500">❯</span> {item.cmd}
              </div>
              <div className="text-gray-300 mt-1 pl-4 leading-relaxed">{item.output}</div>
            </div>
          ))}
          
          {currentCmdIndex < commands.length && (
            <div className="mb-4">
              <div className="flex text-green-400 gap-2">
                <span className="text-purple-500">❯</span> 
                <span>{typingCommand}</span>
                <motion.span 
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="w-2 h-5 bg-white inline-block"
                />
              </div>
            </div>
          )}
          
          {currentCmdIndex >= commands.length && (
            <div className="flex text-green-400 gap-2">
              <span className="text-purple-500">❯</span> 
              <motion.span 
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2 h-5 bg-white inline-block"
              />
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};
