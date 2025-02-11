// /app/components/HomeSection.tsx (ou onde estiver o componente)
"use client";

import {
  MapPin,
  Circle,
  Github,
  Linkedin,
  Instagram,
  Facebook,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

export default function HomeSection() {
  const { language } = useLanguage();
  const homeText = translations[language].home;

  return (
    <section className="flex flex-col items-center justify-center px-8 py-20 min-h-screen text-center bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-300 relative">
      {/* Conteúdo de Texto */}
      <div className="max-w-3xl">
        <p className="text-gray-600 dark:text-gray-400 text-2xl">
          {homeText.greeting}
        </p>
        <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white">
          {homeText.name}
        </h1>
        <h2 className="text-3xl md:text-4xl text-blue-500 dark:text-blue-400 font-semibold mt-2">
          {homeText.title}
        </h2>

        {/* Localização e Disponibilidade */}
        <div className="flex flex-col items-center space-y-3 mt-6 text-gray-700 dark:text-gray-300">
          <div className="flex items-center space-x-2 text-xl">
            <MapPin size={24} />
            <span>{homeText.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-xl">
            <Circle size={18} className="text-green-600 dark:text-green-500 fill-current" />
            <span>{homeText.availability}</span>
          </div>
        </div>

        {/* Links Sociais */}
        <div className="flex justify-center space-x-6 mt-8">
          <a
            href="https://github.com/BCaceress"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
            target="_blank"
          >
            <Github size={30} />
          </a>
          <a
            href="https://www.linkedin.com/in/brunocaceress/"
            className="text-gray-600 dark:text-gray-300 hover:text-[#0077B5] dark:hover:text-[#0077B5] transition-colors duration-200"
            target="_blank"
          >
            <Linkedin size={30} />
          </a>
          <a
            href="https://www.instagram.com/brunocaceress/#"
            className="text-gray-600 dark:text-gray-300 hover:text-[#E1306C] dark:hover:text-[#E1306C] transition-colors duration-200"
            target="_blank"
          >
            <Instagram size={30} />
          </a>
          <a
            href="https://www.facebook.com/brunocaceress"
            className="text-gray-600 dark:text-gray-300 hover:text-[#1877F2] dark:hover:text-[#1877F2] transition-colors duration-200"
            target="_blank"
          >
            <Facebook size={30} />
          </a>
          <a
            href="https://wa.me/5551981927091"
            className="text-gray-600 dark:text-gray-300 hover:text-[#25D366] dark:hover:text-[#25D366] transition-colors duration-200"
            target="_blank"
          >
            <MessageCircle size={30} />
          </a>
        </div>

        {/* Código estilizado como terminal */}
        <div className="mt-8 w-full max-w-2xl mx-auto bg-gray-900 dark:bg-gray-800 rounded-lg shadow-lg border border-gray-700">
          {/* Barra de título da IDE */}
          <div className="flex items-center px-6 py-1 bg-gray-800 dark:bg-gray-700 border-b border-gray-700 rounded-t-lg">
            <div className="flex space-x-2">
              <span className="w-4 h-4 bg-red-500 rounded-full"></span>
              <span className="w-4 h-4 bg-yellow-500 rounded-full"></span>
              <span className="w-4 h-4 bg-green-500 rounded-full"></span>
            </div>
            <span className="ml-auto text-gray-400 text-lg">index.js</span>
          </div>

          {/* Conteúdo da IDE */}
          <div className="px-6 py-5 text-lg font-mono">
            <p className="text-green-400">{homeText.code.comment1}</p>
            <p className="text-green-400">{homeText.code.comment2}</p>
            <p>
              <span className="text-green-400">
                {homeText.code.githubLinkText}
              </span>
              <span className="text-white"> = </span>{" "}
              <a
                href="https://github.com/BCaceress"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:underline"
              >
                {homeText.code.githubLinkUrl}
              </a>
              <span className="text-white">;</span>
            </p>
          </div>
        </div>
      </div>

      {/* Seta animada apontando para baixo */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <ChevronDown size={40} className="text-gray-600 dark:text-gray-300" />
      </motion.div>
    </section>
  );
}
