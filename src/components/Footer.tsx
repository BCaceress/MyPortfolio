"use client";

import { Instagram, Facebook, Linkedin, Github, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

export default function Footer() {
  const { language } = useLanguage();
  // Caso a tradução para o idioma atual não exista, utiliza como fallback o inglês.
  const footerText = (translations[language] || translations["en"]).footer;

  return (
    <footer className="w-full bg-light-bg dark:bg-dark-bg text-gray-300 p-4 flex flex-col md:flex-row items-center justify-between border-t border-gray-300 dark:border-gray-700 backdrop-blur-sm bg-opacity-80">
      {/* Seção de Redes Sociais */}
      <div className="flex items-center gap-3 mb-3 md:mb-0">
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {footerText.findMe}
        </span>
        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/brunocaceress"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-200"
          >
            <Instagram size={18} className="text-gray-500 dark:text-gray-400" />
          </a>
          <a
            href="https://www.facebook.com/brunocaceress"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200"
          >
            <Facebook size={18} className="text-gray-500 dark:text-gray-400" />
          </a>
          <a
            href="https://www.linkedin.com/in/brunocaceress/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200"
          >
            <Linkedin size={18} className="text-gray-500 dark:text-gray-400" />
          </a>
        </div>
      </div>

      {/* Texto Centralizado */}
      <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-3 md:mb-0">
        {footerText.year} | {footerText.designedAndCoded}{" "}
        <Heart size={16} className="inline text-red-500" /> {footerText.by} Bruno Caceres
      </div>

      {/* Seção do GitHub */}
      <div className="flex items-center gap-2">
        <a
          href="https://github.com/BCaceress"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-gray-500 dark:hover:text-gray-400 transition-colors duration-200"
        >
          <span className="text-gray-600 dark:text-gray-300">@BCaceress</span>
          <Github size={18} className="text-gray-500 dark:text-gray-400" />
        </a>
      </div>
    </footer>
  );
}
