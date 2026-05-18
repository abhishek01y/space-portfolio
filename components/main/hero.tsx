import { HeroContent } from "@/components/sub/hero-content";
import { SpaceSceneCanvas } from "@/components/main/space-scene";

export const Hero = () => {
  return (
    <div className="relative flex flex-col h-full w-full">
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="rotate-180 absolute top-[-340px] left-0 w-full h-full object-cover -z-20 opacity-60 mix-blend-screen"
      >
        <source src="/videos/blackhole.webm" type="video/webm" />
      </video>

      <SpaceSceneCanvas />
      <HeroContent />
      
      {/* Bottom gradient fade for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#030014] to-transparent z-[18]" />
    </div>
  );
};
