import Link from "next/link";

import { RESUME_HIGHLIGHTS } from "@/constants";

export const Resume = () => {
  return (
    <section
      id="resume"
      className="relative z-20 w-full px-6 py-20 sm:px-10 lg:px-20"
    >
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[8px] border border-[#2A0E61] bg-[#08021a]/70 p-8 shadow-2xl shadow-[#2A0E61]/25 backdrop-blur-md lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[#b49bff]">
            Resume & Achievements
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
            Key Highlights & Accomplishments
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-400">
            Here are some of my proudest achievements and participation in various hackathons and competitions. You can also download my full resume below.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/resume.pdf"
              download
              className="rounded-[8px] bg-white px-5 py-3 text-sm font-semibold text-[#030014] transition hover:bg-[#b49bff]"
            >
              Download Resume
            </Link>
            <Link
              href="#contact"
              className="rounded-[8px] border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#b49bff] hover:text-[#b49bff]"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="grid gap-3">
          {RESUME_HIGHLIGHTS.map((item) => (
            <div
              key={item}
              className="rounded-[8px] border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-gray-300"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
