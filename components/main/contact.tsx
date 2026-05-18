"use client";

import Link from "next/link";
import { useState } from "react";
import { DocumentDuplicateIcon, CheckIcon } from "@heroicons/react/24/outline";

import { LINKS, SOCIALS } from "@/constants";

export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const email = "abhishkeyadav5@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="relative z-20 w-full px-6 py-20 sm:px-10 lg:px-20"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-[8px] border border-[#7042f8]/40 bg-gradient-to-r from-[#08021a] via-[#120631] to-[#030014] p-8 shadow-2xl shadow-[#7042f8]/20 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[#b49bff]">
            Get In Touch
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-white">
            Let's build something amazing together.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-gray-400">
            Whether you have a question, a project idea, or just want to say hi, feel free to drop a message.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleCopyEmail}
            className="group flex items-center gap-2 rounded-[8px] bg-white px-5 py-3 text-sm font-semibold text-[#030014] transition hover:bg-[#b49bff]"
          >
            {copied ? <CheckIcon className="h-4 w-4" /> : <DocumentDuplicateIcon className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy Email"}
          </button>
          
          <Link
            href={`mailto:${email}`}
            className="rounded-[8px] border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#b49bff] hover:text-[#b49bff] bg-white/5"
          >
            Send Email
          </Link>

          {SOCIALS.map(({ link, name, icon: Icon }) => (
            <Link
              key={name}
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={name}
              className="grid h-11 w-11 place-items-center rounded-[8px] border border-white/20 text-white transition hover:border-[#b49bff] hover:text-[#b49bff] hover:bg-white/5"
            >
              <Icon className="h-5 w-5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
