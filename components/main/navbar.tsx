"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { LINKS, NAV_LINKS, SOCIALS } from "@/constants";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#030014d9] md:bg-[#03001427] backdrop-blur-md z-50 px-4 md:px-10">
      <div className="w-full h-full flex items-center justify-between m-auto px-[10px]">
        <Link href="#about-me" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Space Portfolio logo"
            width={70}
            height={70}
            draggable={false}
            priority
            className="cursor-pointer"
          />
          <div className="hidden md:flex font-bold ml-[10px] text-gray-300">
            Space Portfolio
          </div>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex w-[600px] h-full flex-row items-center justify-between md:mr-8 lg:mr-20"
        >
          <div className="flex items-center justify-between gap-4 w-full h-auto border-[rgba(112,66,248,0.38)] bg-[rgba(3,0,20,0.37)] mr-[15px] px-[20px] py-[10px] rounded-full text-sm text-gray-200">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="cursor-pointer hover:text-[rgb(112,66,248)] transition"
              >
                {link.title}
              </Link>
            ))}

            <Link
              href={LINKS.sourceCode}
              target="_blank"
              rel="noreferrer noopener"
              className="cursor-pointer hover:text-[rgb(112,66,248)] transition"
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
            >
              <Icon className="h-6 w-6 text-white" />
            </Link>
          ))}
        </div>

        <button
          type="button"
          aria-label={
            isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMobileMenuOpen}
          className="md:hidden text-white focus:outline-none rounded-md p-2 hover:bg-white/10 transition"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-7 w-7" />
          ) : (
            <Bars3Icon className="h-7 w-7" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-[65px] left-0 w-full bg-[#030014] border-t border-[#2A0E61] p-5 flex flex-col items-center text-gray-300 md:hidden">
          <div className="flex flex-col items-center gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="cursor-pointer hover:text-[rgb(112,66,248)] transition text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            <Link
              href={LINKS.sourceCode}
              target="_blank"
              rel="noreferrer noopener"
              className="cursor-pointer hover:text-[rgb(112,66,248)] transition text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Source Code
            </Link>
          </div>

          <div className="flex justify-center gap-6 mt-6">
            {SOCIALS.map(({ link, name, icon: Icon }) => (
              <Link
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                key={name}
                aria-label={name}
              >
                <Icon className="h-8 w-8 text-white" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
