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
import { Terminal } from "@/components/main/terminal";
import { Timeline } from "@/components/main/timeline";
import { GithubStats } from "@/components/main/github-stats";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Terminal />
        <MissionControl />
        <About />
        <Timeline />
        <Skills />
        <EventHorizon />
        <Encryption />
        <Projects />
        <GithubStats />
        <Resume />
        <Process />
        <Contact />
      </div>
    </main>
  );
}
