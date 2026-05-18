export const EventHorizon = () => {
  return (
    <section className="relative z-20 flex min-h-[420px] w-full items-center justify-center overflow-hidden px-6 py-20">
      <div className="absolute h-[320px] w-[320px] rounded-full border border-[#7042f8]/40 bg-[radial-gradient(circle_at_center,#05010f_0%,#05010f_32%,#7042f8_33%,#00d8ff_35%,transparent_58%)] shadow-[0_0_120px_rgba(112,66,248,0.45)]" />
      <div className="absolute h-[460px] w-[460px] rounded-full border border-[#00d8ff]/10" />
      <div className="absolute h-[620px] w-[620px] rounded-full border border-[#7042f8]/10" />

      <div className="relative max-w-3xl text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-[#b49bff]">
          Event Horizon
        </p>
        <h2 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
          A cinematic section for your strongest message.
        </h2>
        <p className="mt-6 text-base leading-8 text-gray-300">
          Use this space for a personal statement, featured achievement, or
          high-impact project summary once your final content is ready.
        </p>
      </div>
    </section>
  );
};
