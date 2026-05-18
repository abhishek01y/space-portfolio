"use client";

import type { CSSProperties, PointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  src: string;
  title: string;
  description: string;
  link: string;
  techStack?: readonly string[];
  highlights?: readonly string[];
};

export const ProjectCard = ({
  src,
  title,
  description,
  link,
  techStack,
  highlights,
}: ProjectCardProps) => {
  const isExternalLink = /^https?:\/\//.test(link);
  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
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
    <Link
      href={link}
      target={isExternalLink ? "_blank" : undefined}
      rel={isExternalLink ? "noreferrer noopener" : undefined}
      onPointerMove={handlePointerMove}
      style={
        {
          "--glow-x": "50%",
          "--glow-y": "50%",
        } as CSSProperties
      }
      className="group relative flex flex-col h-full overflow-hidden rounded-lg shadow-lg border border-[#2A0E61] bg-[#030014]/70 transition duration-300 hover:-translate-y-1 hover:border-[#7042f8]"
    >
      <div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(260px_circle_at_var(--glow-x)_var(--glow-y),rgba(112,66,248,0.28),transparent_58%)]" />
      </div>

      <Image
        src={src}
        alt={title}
        width={1000}
        height={1000}
        className="w-full object-cover aspect-video"
      />

      <div className="relative z-20 p-4 flex flex-col flex-grow">
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-gray-300 flex-grow">{description}</p>
        
        {techStack && techStack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span key={tech} className="px-2 py-1 text-xs font-medium bg-[#2A0E61]/50 text-[#b49bff] rounded-md border border-[#2A0E61]">
                {tech}
              </span>
            ))}
          </div>
        )}

        {highlights && highlights.length > 0 && (
          <ul className="mt-4 space-y-1">
            {highlights.map((highlight, idx) => (
              <li key={idx} className="text-xs text-gray-400 flex items-start">
                <span className="mr-2 text-[#7042f8] mt-0.5">•</span>
                {highlight}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  );
};
