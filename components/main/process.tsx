import { PROCESS_STEPS } from "@/constants";

export const Process = () => {
  return (
    <section className="relative z-20 w-full px-6 py-20 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-3">
          <p className="text-sm uppercase tracking-[0.35em] text-[#b49bff]">
            Build Sequence
          </p>
          <h2 className="text-4xl font-semibold text-white md:text-5xl">
            From idea to production polish.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {PROCESS_STEPS.map((item) => (
            <div
              key={item.step}
              className="rounded-[8px] border border-[#2A0E61] bg-[#08021a]/70 p-6 backdrop-blur-md"
            >
              <div className="text-sm font-semibold text-[#b49bff]">
                {item.step}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
