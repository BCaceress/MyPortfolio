import AboutMe from "@/app/about-me/page";
import ContactMe from "@/app/contact-me/page";
import Hello from "@/app/page";
import Projects from "@/app/projects/page";
import Skills from "@/app/skills/page";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { LanguageProvider } from "@/contexts/LanguageContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bruno Caceres - Portfolio",
  description: "Portfolio de Bruno Caceres, desenvolvedor full-stack",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white dark:bg-dark-bg transition-colors duration-300`}>
        <LanguageProvider>
          <PageTransition>
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
          </PageTransition>
        </LanguageProvider>
      </body>
    </html>
  );
}
