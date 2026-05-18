"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import { LINKS, NAV_LINKS, SOCIALS } from "@/constants";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(link => link.link.substring(1));
      let current = "";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#030014]/80 backdrop-blur-md z-50 px-4 md:px-10 border-b border-[#2A0E61]/50 transition-all">
      <div className="w-full h-full flex items-center justify-between m-auto px-[10px]">
        <Link href="#about-me" className="flex items-center group">
          <Image
            src="/logo.png"
            alt="Space Portfolio logo"
            width={70}
            height={70}
            draggable={false}
            priority
            className="cursor-pointer group-hover:animate-pulse-slow"
          />
          <div className="hidden md:flex font-bold ml-[10px] text-gray-300 group-hover:text-white transition-colors">
            Space Portfolio
          </div>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex w-[600px] h-full flex-row items-center justify-between md:mr-8 lg:mr-20"
        >
          <div className="flex items-center justify-between gap-4 w-full h-auto border border-[#7042f8]/30 bg-[#030014]/60 mr-[15px] px-[20px] py-[10px] rounded-full text-sm text-gray-200 shadow-[0_0_15px_rgba(112,66,248,0.1)]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className={cn(
                  "cursor-pointer transition-colors px-3 py-1 rounded-full",
                  activeSection === link.link.substring(1) 
                    ? "text-[#b49bff] bg-[#7042f8]/10" 
                    : "hover:text-[#b49bff] hover:bg-white/5"
                )}
              >
                {link.title}
              </Link>
            ))}

            <Link
              href={LINKS.sourceCode}
              target="_blank"
              rel="noreferrer noopener"
              className="cursor-pointer hover:text-[#b49bff] hover:bg-white/5 px-3 py-1 rounded-full transition-colors"
            >
              Source Code
            </Link>
          </div>
        </nav>

        <div className="hidden md:flex flex-row gap-5">
          {SOCIALS.map(({ link, name, icon: Icon }) => (
            <Link
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              key={name}
              aria-label={name}
              className="text-white hover:text-[#b49bff] transition-transform hover:scale-110"
            >
              <Icon className="h-6 w-6" />
            </Link>
          ))}
        </div>

        <button
          type="button"
          aria-label={
            isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMobileMenuOpen}
          className="md:hidden text-white focus:outline-none rounded-md p-2 hover:bg-white/10 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-7 w-7 text-[#b49bff]" />
          ) : (
            <Bars3Icon className="h-7 w-7" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[65px] left-0 w-full bg-[#030014]/95 backdrop-blur-xl border-b border-[#2A0E61] p-6 flex flex-col items-center text-gray-300 md:hidden shadow-2xl"
          >
            <div className="flex flex-col items-center gap-6 w-full">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.title}
                  href={link.link}
                  className={cn(
                    "cursor-pointer transition-colors text-center w-full py-2 rounded-lg text-lg",
                    activeSection === link.link.substring(1) 
                      ? "text-[#b49bff] bg-[#7042f8]/10 font-medium" 
                      : "hover:text-[#b49bff] hover:bg-white/5"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.title}
                </Link>
              ))}
              <Link
                href={LINKS.sourceCode}
                target="_blank"
                rel="noreferrer noopener"
                className="cursor-pointer hover:text-[#b49bff] hover:bg-white/5 transition-colors text-center w-full py-2 rounded-lg text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Source Code
              </Link>
            </div>

            <div className="flex justify-center gap-8 mt-8 pt-6 border-t border-[#2A0E61]/50 w-full">
              {SOCIALS.map(({ link, name, icon: Icon }) => (
                <Link
                  href={link}
                  target="_blank"
                  rel="noreferrer noopener"
                  key={name}
                  aria-label={name}
                  className="hover:text-[#b49bff] transition-transform hover:scale-110"
                >
                  <Icon className="h-7 w-7 text-white hover:text-[#b49bff]" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
