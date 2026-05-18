import { ABOUT_PANELS } from "@/constants";

export const About = () => {
  return (
    <section
      id="about-me"
      className="relative z-20 flex w-full flex-col items-center justify-center px-6 py-20 sm:px-10 lg:px-20"
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[#b49bff]">
            About Me
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
            Passionate about building scalable and intelligent systems.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-gray-400">
            Hi, I'm Abhishek—a developer who thrives on turning complex problems into elegant, user-centric solutions. With a deep passion for full stack development and AI, I build digital experiences that are not just functional, but inherently scalable and intuitive.
          </p>
          <p className="mt-4 max-w-xl text-base leading-8 text-gray-400">
            Currently, I'm focused on crafting modern web applications using <span className="text-[#b49bff]">Next.js, React, Node.js,</span> and <span className="text-[#b49bff]">TypeScript</span>. I genuinely enjoy exploring backend architectures and integrating intelligent systems. What motivates me most is seeing the tangible impact of well-written code on real users.
          </p>
        </div>

        <div className="grid gap-4">
          {ABOUT_PANELS.map((panel) => (
            <div
              key={panel.title}
              className="rounded-[8px] border border-[#2A0E61] bg-[#08021a]/70 p-6 shadow-lg shadow-[#2A0E61]/20 backdrop-blur-md"
            >
              <h3 className="text-xl font-semibold text-white">{panel.title}</h3>
              <p className="mt-3 text-sm leading-7 text-gray-400">
                {panel.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
