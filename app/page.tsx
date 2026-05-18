import { About } from "@/components/main/about";
import { Contact } from "@/components/main/contact";
import { Encryption } from "@/components/main/encryption";
import { EventHorizon } from "@/components/main/event-horizon";
import { Hero } from "@/components/main/hero";
import { MissionControl } from "@/components/main/mission-control";
import { Process } from "@/components/main/process";
import { Projects } from "@/components/main/projects";
import { Resume } from "@/components/main/resume";
import { Skills } from "@/components/main/skills";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <MissionControl />
        <About />
        <Skills />
        <EventHorizon />
        <Encryption />
        <Projects />
        <Resume />
        <Process />
        <Contact />
      </div>
    </main>
  );
}
