import { MISSION_STATS } from "@/constants";

export const MissionControl = () => {
  return (
    <section className="relative z-20 w-full px-6 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl rounded-[8px] border border-[#2A0E61] bg-[#08021a]/70 p-5 shadow-2xl shadow-[#2A0E61]/30 backdrop-blur-md">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#b49bff]">
              Mission Control
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white md:text-4xl">
              Portfolio systems online.
            </h2>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-[#7042f8] to-transparent md:mx-8" />
          <p className="max-w-sm text-sm leading-6 text-gray-400">
            A clean dashboard skeleton for your real numbers, highlights, and
            availability.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MISSION_STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[8px] border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="mt-2 text-sm font-medium text-[#b49bff]">
                {stat.label}
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-400">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
