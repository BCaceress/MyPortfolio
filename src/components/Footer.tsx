"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import type { LucideProps } from "lucide-react";
import { Facebook, Github, Heart, Instagram, Linkedin } from "lucide-react";
import React, { memo } from "react";

interface SocialLinkProps {
  href: string;
  icon: React.ElementType<LucideProps>;
  hoverColor: string;
  ariaLabel: string;
}

const SocialLink = memo(
  ({ href, icon: Icon, hoverColor, ariaLabel }: SocialLinkProps) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`p-2 rounded-full transition-all duration-300 hover:bg-opacity-10 hover:scale-110 ${hoverColor}`}
    >
      <Icon size={20} className="text-gray-500 dark:text-gray-400 hover:text-inherit" />
    </a>
  )
);

SocialLink.displayName = "SocialLink";

function Footer() {
  const { language } = useLanguage();
  // Fallback para o inglês se a tradução não existir para o idioma atual
  const footerText = (translations[language] || translations["en"]).footer;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-light-bg dark:bg-dark-bg text-gray-600 dark:text-gray-300 py-6 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between border-t border-gray-200 dark:border-gray-800 backdrop-blur-sm bg-opacity-80 transition-colors duration-300">
      <div className="flex items-center gap-2 mb-4 md:mb-0 animate-fade-in">
        <span className="text-sm font-medium mr-2">
          {footerText.findMe}
        </span>
        <div className="flex items-center">
          <SocialLink
            href="https://www.facebook.com/brunocaceress"
            icon={Facebook}
            hoverColor="hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900"
            ariaLabel="Facebook Profile"
          />
          <SocialLink
            href="https://www.instagram.com/brunocaceress"
            icon={Instagram}
            hoverColor="hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-100 dark:hover:bg-pink-900"
            ariaLabel="Instagram Profile"
          />
          <SocialLink
            href="https://www.linkedin.com/in/brunocaceress/"
            icon={Linkedin}
            hoverColor="hover:text-blue-500 dark:hover:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900"
            ariaLabel="LinkedIn Profile"
          />
        </div>
      </div>

      {/* Texto Central */}
      <div className="text-center text-sm font-medium mb-4 md:mb-0 group animate-fade-in">
        <span>
          {currentYear} | {footerText.designedAndCoded}{" "}
        </span>
        <Heart
          size={16}
          className="inline text-red-500 group-hover:animate-heartbeat mx-1"
          aria-hidden="true"
        />
        <span>{footerText.by} Bruno Caceres</span>
      </div>

      {/* Seção do GitHub */}
      <div className="flex items-center animate-fade-in">
        <a
          href="https://github.com/BCaceress"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
          className="flex items-center gap-2 py-1 px-3 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <span className="text-sm font-medium">@BCaceress</span>
          <Github
            size={20}
            className="text-gray-500 dark:text-gray-400 transition-transform duration-300 hover:rotate-12"
          />
        </a>
      </div>
    </footer>
  );
}

export default memo(Footer);
