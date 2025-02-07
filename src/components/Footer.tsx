import { Instagram, Facebook, Linkedin, Github, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bottom-0 w-full bg-light-bg dark:bg-dark-bg text-gray-300 p-3 flex items-center justify-between border-transparent dark:border-gray-700">
      {/* Seção de redes sociais */}
      <div className="flex items-center px-4">
        <span className="text-sm mr-2 text-gray-600 dark:text-gray-300">find me in:</span>
        <div className="flex gap-4">
          <a
            href="https://www.instagram.com/brunocaceress"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-200"
          >
            <Instagram size={18} className="text-gray-500 dark:text-gray-400" />
          </a>
          <div className="w-px h-4 bg-gray-700"></div>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors duration-200"
          >
            <Facebook size={18} className="text-gray-500 dark:text-gray-400" />
          </a>
          <div className="w-px h-4 bg-gray-700"></div>
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
      <div className="flex-1 text-center text-sm text-gray-600 dark:text-gray-400">
        2025 | Designed and coded with <Heart size={16} className="inline text-red-500" /> by Bruno Caceres
      </div>

      {/* Seção do GitHub */}
      <div className="px-4">
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
