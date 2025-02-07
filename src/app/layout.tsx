import type { Metadata } from "next";
import "../styles/globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hello from "@/app/page";
import AboutMe from "@/app/about-me/page";
import ContactMe from "@/app/contact-me/page";
import Skills from "@/app/skills/page";
import Projects from "@/app/projects/page";

export const metadata: Metadata = {
  title: "Bruno Cacerees Portfólio",
  description: "Portfólio de Bruno Caceres - Desenvolvedor Web e Mobile",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col bg-light-bg dark:bg-dark-bg text-black dark:text-white transition-colors duration-300">
        <Navbar />
        <main className="flex-grow">
        <section id="home">
          <Hello />
        </section>
        <section id="about">
          <AboutMe/>
        </section>
        <section id="skills">
          <Skills/>
        </section>
        <section id="projects">
          <Projects/>
        </section>
        <section id="contact">
         <ContactMe/>
         </section>
        </main>
        <Footer />
      </body>
    </html>
  );
}
