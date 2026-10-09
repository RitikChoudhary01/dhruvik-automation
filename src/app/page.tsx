import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
import { Capabilities } from "@/components/Capabilities";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Process } from "@/components/Process";
import { ProjectsSection } from "@/components/ProjectsSection";
import { Services } from "@/components/Services";

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
