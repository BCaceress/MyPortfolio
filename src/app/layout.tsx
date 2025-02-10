import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hello from "@/app/page";
import AboutMe from "@/app/about-me/page";
import ContactMe from "@/app/contact-me/page";
import Skills from "@/app/skills/page";
import Projects from "@/app/projects/page";

export const metadata: Metadata = {
  title: "Bruno Caceres Portfólio",
  description: "Portfólio de Bruno Caceres - Desenvolvedor Web e Mobile",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function Portfolio() {
  return (
    <html lang="pt-BR" className="dark"> {/* Aplica o modo escuro por padrão */}
      <body className="min-h-screen flex flex-col bg-dark-bg text-white transition-colors duration-300">
        <Navbar />
        <main className="flex-grow">
          <section id="home">
            <Hello />
          </section>
          <section id="about">
            <AboutMe />
          </section>
          <section id="skills">
            <Skills />
          </section>
          <section id="projects">
            <Projects />
          </section>
          <section id="contact">
            <ContactMe />
          </section>
        </main>
        <Footer />
      </body>
    </html>
  );
}
