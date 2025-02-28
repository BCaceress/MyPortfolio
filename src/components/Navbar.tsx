// /components/Navbar.tsx
"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { Download, Menu, Moon, Sun, X } from "lucide-react";
import { memo, useCallback, useEffect, useState } from "react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark" ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => {
    setIsAnimating(true);
    // Aguarda a animação completar antes de mudar o estado
    setTimeout(() => {
      setDarkMode(prev => !prev);
      // Define um tempo para a animação terminar
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }, 300);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
  }, []);

  const handleScroll = useCallback((id: string) => {
    setActiveLink(id);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  }, []);

  const handleDownload = useCallback(() => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
    }, 1500);
  }, []);

  // Fechar menu ao pressionar ESC
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [menuOpen]);

  // Fechar menu quando a tela for redimensionada para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  // Detectar seção ativa ao rolar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveLink(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "home", label: translations[language].navbar.home },
    { id: "about", label: translations[language].navbar.about },
    { id: "skills", label: translations[language].navbar.skills },
    { id: "projects", label: translations[language].navbar.projects },
    { id: "contact", label: translations[language].navbar.contact }
  ];

  // Classe CSS para a animação do ícone
  const iconAnimationClass = isAnimating
    ? darkMode
      ? "opacity-0 transform scale-0 rotate-180 translate-y-8"
      : "opacity-0 transform scale-0 -rotate-180 -translate-y-8"
    : "opacity-100 transform scale-100 rotate-0 translate-y-0";

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-dark-bg shadow-md transition-colors duration-300 z-50" role="navigation" aria-label="Main navigation">
      <div className="text-xl font-bold text-gray-900 dark:text-white">
        <a
          href="#home"
          className="focus:outline-none rounded transition-transform duration-300 hover:scale-110 inline-block"
          onClick={(e) => {
            e.preventDefault();
            handleScroll("home");
          }}
        >
          <span className="text-black dark:text-white transition-colors duration-300">&lt;BC /&gt;</span>
        </a>
      </div>

      {/* Menu button for smaller screens */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-gray-700 dark:text-gray-300 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 focus:outline-none"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        <div className="relative h-6 w-6 overflow-hidden">
          <X
            size={24}
            aria-hidden="true"
            className={`absolute transition-transform duration-300 ${menuOpen ? 'translate-y-0 rotate-0 opacity-100' : 'translate-y-10 rotate-90 opacity-0'}`}
          />
          <Menu
            size={24}
            aria-hidden="true"
            className={`absolute transition-transform duration-300 ${!menuOpen ? 'translate-y-0 rotate-0 opacity-100' : 'translate-y-10 rotate-90 opacity-0'}`}
          />
        </div>
      </button>

      <div
        id="mobile-menu"
        className={`absolute md:static top-16 left-0 w-full md:w-auto bg-white dark:bg-dark-bg md:flex md:items-center md:space-x-6 p-4 md:p-0 shadow-md md:shadow-none transition-all duration-300 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-[-10px] opacity-0 pointer-events-none md:translate-y-0 md:opacity-100 md:pointer-events-auto"
          }`}
      >
        {/* Navigation Links */}
        <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-gray-700 dark:text-gray-300">
          {navLinks.map(link => (
            <li key={link.id}>
              <button
                onClick={() => handleScroll(link.id)}
                className={`transition-all duration-300 focus:outline-none rounded px-3 py-1 relative group ${activeLink === link.id
                    ? 'text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-400'
                  }`}
                aria-label={`Navigate to ${link.id} section`}
                aria-current={activeLink === link.id ? "page" : undefined}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transform transition-transform duration-300 ${activeLink === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
              </button>
            </li>
          ))}
        </ul>

        <div className="border-t border-gray-300 dark:border-gray-600 my-4 md:hidden"></div>

        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          {/* Language toggle button */}
          <button
            onClick={toggleLanguage}
            className="text-gray-700 dark:text-gray-300 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-transform duration-300 hover:scale-110 focus:outline-none"
            aria-label={`Switch to ${language === 'en' ? 'Portuguese' : 'English'}`}
          >
            {translations[language].navbar.languageToggle}
          </button>

          {/* Dark/light mode toggle button with animation */}
          <button
            onClick={toggleDarkMode}
            className="text-gray-700 dark:text-gray-300 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-transform duration-300 hover:scale-110 focus:outline-none relative h-10 w-10 flex items-center justify-center overflow-hidden"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            disabled={isAnimating}
          >
            {/* Contêiner com posição absoluta para cada ícone */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Sol - visível no modo escuro para trocar para claro */}
              <Sun
                size={20}
                aria-hidden="true"
                className={`absolute transition-all duration-500 ease-in-out ${darkMode ? iconAnimationClass : 'opacity-0 scale-0'}`}
              />

              {/* Lua - visível no modo claro para trocar para escuro */}
              <Moon
                size={20}
                aria-hidden="true"
                className={`absolute transition-all duration-500 ease-in-out ${!darkMode ? iconAnimationClass : 'opacity-0 scale-0'}`}
              />
            </div>
          </button>

          {/* Download CV button with animation */}
          <a
            href="/PDF/BrunoCaceresCurrículo.pdf"
            download
            onClick={handleDownload}
            className="group bg-gray-900 dark:bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-700 transition-all duration-300 hover:shadow-lg mt-2 md:mt-0 text-center focus:outline-none relative overflow-hidden"
            aria-label="Download CV"
          >
            <span className={`inline-flex items-center transition-transform duration-300 ${isDownloading ? 'transform -translate-y-10' : ''}`}>
              {translations[language].navbar.downloadCV}
            </span>
            <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isDownloading ? 'transform translate-y-0 opacity-100' : 'transform translate-y-10 opacity-0'}`}>
              <Download size={18} className="mr-1 animate-bounce" />
              <span>Downloading...</span>
            </span>
            <span className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-1000 ease-out group-hover:w-full" style={{ width: isDownloading ? '100%' : '0%' }}></span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default memo(Navbar);
