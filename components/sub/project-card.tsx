"use client";

import type { CSSProperties, PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { RxGithubLogo, RxOpenInNewWindow } from "react-icons/rx";

type ProjectCardProps = {
  src: string;
  title: string;
  description: string;
  githubLink?: string;
  demoLink?: string;
  techStack?: readonly string[];
  highlights?: readonly string[];
};

export const ProjectCard = ({
  src,
  title,
  description,
  githubLink,
  demoLink,
  techStack,
  highlights,
}: ProjectCardProps) => {
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    event.currentTarget.style.setProperty(
      "--glow-x",
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--glow-y",
      `${event.clientY - rect.top}px`,
    );
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      style={
        {
          "--glow-x": "50%",
          "--glow-y": "50%",
        } as CSSProperties
      }
      className="group relative flex flex-col h-full overflow-hidden rounded-xl shadow-[0_0_15px_rgba(112,66,248,0.1)] border border-[#2A0E61] bg-[#030014]/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#7042f8] hover:shadow-[0_0_25px_rgba(112,66,248,0.2)]"
    >
      <div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(260px_circle_at_var(--glow-x)_var(--glow-y),rgba(112,66,248,0.28),transparent_58%)]" />
      </div>

      <div className="relative overflow-hidden aspect-video">
        <Image
          src={src}
          alt={title}
          width={1000}
          height={1000}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/90 to-transparent" />
      </div>

      <div className="relative z-20 p-6 flex flex-col flex-grow">
        <h1 className="text-2xl font-bold text-white transition-colors group-hover:text-[#b49bff]">{title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-300 flex-grow">{description}</p>
        
        {techStack && techStack.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span key={tech} className="px-2.5 py-1 text-xs font-semibold bg-[#2A0E61]/40 text-[#b49bff] rounded-full border border-[#2A0E61] shadow-inner transition-colors hover:bg-[#2A0E61]/80 hover:text-white">
                {tech}
              </span>
            ))}
          </div>
        )}

        {highlights && highlights.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {highlights.map((highlight, idx) => (
              <li key={idx} className="text-xs text-gray-400 flex items-start">
                <span className="mr-2 text-[#b49bff] mt-0.5 opacity-80">▹</span>
                {highlight}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex gap-4 pt-4 border-t border-[#2A0E61]/50">
          {demoLink && (
            <Link
              href={demoLink}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2 text-sm font-medium text-white bg-[#7042f8]/20 hover:bg-[#7042f8]/40 border border-[#7042f8]/50 hover:border-[#b49bff] px-4 py-2 rounded-lg transition-all"
            >
              <RxOpenInNewWindow className="w-4 h-4" />
              Live Demo
            </Link>
          )}
          {githubLink && (
            <Link
              href={githubLink}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2 text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 px-4 py-2 rounded-lg transition-all"
            >
              <RxGithubLogo className="w-4 h-4" />
              GitHub
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
