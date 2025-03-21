"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { motion, useInView } from "framer-motion";
import {
  ChevronDown,
  Circle,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  LucideIcon,
  MapPin,
  MessageCircle
} from "lucide-react";
import { memo, useCallback, useEffect, useRef, useState } from "react";

// Custom hook for scroll reveal animations
const useScrollReveal = (options = { threshold: 0.1 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, options);

  return { ref, isInView };
};

// Custom hook for typewriter effect
const useTypewriter = (words: string[], typingSpeed: number = 150, deletingSpeed: number = 100, delayBetween: number = 2000) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeEffect = () => {
      const currentWord = words[wordIndex];
      const shouldDelete = isDeleting;

      setText(prev =>
        shouldDelete
          ? currentWord.substring(0, prev.length - 1)
          : currentWord.substring(0, prev.length + 1)
      );

      // Handle the typing/deleting cycle
      if (!shouldDelete && text === currentWord) {
        // Start deleting after delay
        setTimeout(() => setIsDeleting(true), delayBetween);
      } else if (shouldDelete && text === '') {
        setIsDeleting(false);
        // Move to next word
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const timer = setTimeout(
      typeEffect,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, delayBetween]);

  return text;
};

// Interfaces para tipagem
interface SocialIconProps {
  href: string;
  icon: LucideIcon;
  hoverColor: string;
  ariaLabel: string;
}

interface CodeContent {
  comment1: string;
  comment2: string;
  githubLinkText: string;
  githubLinkUrl: string;
}

interface CodeTerminalProps {
  codeContent: CodeContent;
}

// Componente de ícone social memoizado para evitar re-renderizações
const SocialIcon = memo(({ href, icon: Icon, hoverColor, ariaLabel }: SocialIconProps) => {
  return (
    <a
      href={href}
      className={`text-gray-600 dark:text-gray-300 hover:text-${hoverColor} dark:hover:text-${hoverColor} transition-colors duration-200`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      <Icon size={30} />
    </a>
  );
});

SocialIcon.displayName = "SocialIcon";

// Componente do terminal de código memoizado
const CodeTerminal = memo(({ codeContent }: CodeTerminalProps) => {
  return (
    <div className="mt-8 w-full max-w-2xl mx-auto bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      {/* Conteúdo da IDE */}
      <div className="px-6 py-5 text-lg font-mono">
        <p className="text-gray-400">Hello World. I am</p>
        <h1 className="text-4xl text-white font-bold mb-2">Bruno Caceres</h1>
        <p className="text-blue-400 text-xl mb-8">&gt; Front-end developer</p>

        <p className="text-gray-400">{codeContent.comment1}</p>
        <p className="text-gray-400 mb-2">{codeContent.comment2}</p>
        <p>
          <span className="text-blue-500">const</span>
          <span className="text-green-500"> githubLink</span>
          <span className="text-white"> = </span>{" "}
          <a
            href="https://github.com/BCaceress"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-400 hover:underline"
          >
            "https://github.com/BCaceress"
          </a>
          <span className="text-white">;</span>
        </p>
      </div>
    </div>
  );
});

CodeTerminal.displayName = "CodeTerminal";

// Interface para o tipo de dados usado no array socialLinks
interface SocialLink {
  href: string;
  icon: LucideIcon;
  hoverColor: string;
  ariaLabel: string;
}

export default function HomeSection() {
  const { language } = useLanguage();
  const homeText = translations[language].home;
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Função para rolar para a próxima seção
  const scrollToNextSection = useCallback(() => {
    const nextSection = document.querySelector('section:nth-of-type(2)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Array de redes sociais para renderização mais limpa
  const socialLinks: SocialLink[] = [
    {
      href: "https://github.com/BCaceress",
      icon: Github,
      hoverColor: "gray-900",
      ariaLabel: "GitHub Profile"
    },
    {
      href: "https://www.linkedin.com/in/brunocaceress/",
      icon: Linkedin,
      hoverColor: "[#0077B5]",
      ariaLabel: "LinkedIn Profile"
    },
    {
      href: "https://www.instagram.com/brunocaceress/#",
      icon: Instagram,
      hoverColor: "[#E1306C]",
      ariaLabel: "Instagram Profile"
    },
    {
      href: "https://www.facebook.com/brunocaceress",
      icon: Facebook,
      hoverColor: "[#1877F2]",
      ariaLabel: "Facebook Profile"
    },
    {
      href: "https://wa.me/5551981927091",
      icon: MessageCircle,
      hoverColor: "[#25D366]",
      ariaLabel: "WhatsApp Contact"
    }
  ];

  // Social icons component
  const SocialIcons = () => (
    <motion.div
      className="flex space-x-4 mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          className={`text-gray-400 hover:text-${link.hoverColor} transition-colors duration-300`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.ariaLabel}
        >
          <link.icon size={24} />
        </a>
      ))}
    </motion.div>
  );

  const codeContent = {
    comment1: "// complete the game to continue",
    comment2: "// find my profile on GitHub:",
    githubLinkText: "const githubLink",
    githubLinkUrl: "\"https://github.com/BCaceress\""
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const scrollRevealVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  return (
    <section
      id="home"
      className="flex flex-col items-center justify-center px-4 sm:px-8 py-16 sm:py-20 min-h-screen relative overflow-hidden"
      aria-labelledby="home-heading"
    >
      {/* Conteúdo de Texto */}
      <div className="max-w-3xl mx-auto w-full">
        <p className="text-gray-600 dark:text-gray-400 text-xl sm:text-2xl mb-2">
          {homeText.greeting}
        </p>
        <h1
          id="home-heading"
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight"
        >
          {homeText.name}
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-blue-500 dark:text-blue-400 font-semibold mt-2 mb-6">
          {homeText.title}
        </h2>

        {/* Localização e Disponibilidade */}
        <div className="flex flex-col items-center space-y-3 mt-6 text-gray-700 dark:text-gray-300">
          <div className="flex items-center space-x-2 text-lg sm:text-xl" aria-label="Localização">
            <MapPin size={24} aria-hidden="true" />
            <span>{homeText.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-lg sm:text-xl" aria-label="Status de disponibilidade">
            <Circle
              size={18}
              className="text-green-600 dark:text-green-500 fill-current"
              aria-hidden="true"
            />
            <span>{homeText.availability}</span>
          </div>
        </div>

        {/* Links Sociais */}
        <div className="flex justify-center flex-wrap gap-4 sm:gap-6 mt-8">
          {socialLinks.map((social, index) => (
            <SocialIcon
              key={index}
              href={social.href}
              icon={social.icon}
              hoverColor={social.hoverColor}
              ariaLabel={social.ariaLabel}
            />
          ))}
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

      {/* Scroll down indicator */}
      <motion.button
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 p-3 rounded-full bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors z-10"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isLoading ? 0 : 1,
          y: [0, 10, 0]
        }}
        transition={{
          delay: 2,
          y: {
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut"
          }
        }}
        onClick={scrollToNextSection}
        aria-label="Scroll to next section"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronDown size={30} className="text-green-500" />
      </motion.button>
    </section>
  );
}
