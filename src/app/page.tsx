import { Hero } from "@/components/Hero";
import { Capabilities } from "@/components/Capabilities";
import { Services } from "@/components/Services";
import { ProjectsSection } from "@/components/ProjectsSection";
import { Process } from "@/components/Process";
import { Approach } from "@/components/Approach";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Capabilities />
      <Services />
      <ProjectsSection />
      <Process />
      <Approach />
      <About />
      <Contact />
    </>
  );
}
