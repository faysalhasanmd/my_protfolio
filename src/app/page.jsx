import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import SectionDivider from "@/components/SectionDivider";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SectionDivider label="ABOUT" />
        <About />
        <SectionDivider label="SKILLS" />
        <Skills />
        <SectionDivider label="PROJECTS" />
        <Projects />
        <SectionDivider label="QUALIFICATIONS" />
        <Timeline />
        <SectionDivider label="CONTACT" />
        <Contact />
      </main>
    </>
  );
}
