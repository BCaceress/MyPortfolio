"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { motion, useAnimation, useInView } from "framer-motion";
import type { LucideProps } from "lucide-react";
import { ArrowUp, Github, Heart, Instagram, Linkedin, Mail, MessageSquare } from "lucide-react";
import React, { memo, useEffect, useRef } from "react";

interface SocialLinkProps {
  href: string;
  icon: React.ElementType<LucideProps>;
  label: string;
  color: string;
  ariaLabel: string;
}

const SocialLink = memo(
  ({ href, icon: Icon, label, color, ariaLabel }: SocialLinkProps) => (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 ${color}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon size={20} />
      <span className="text-sm font-medium hidden md:inline">{label}</span>
    </motion.a>
  )
);

SocialLink.displayName = "SocialLink";

function Footer() {
  const { language } = useLanguage();
  const footerText = (translations[language] || translations["en"]).footer;
  const currentYear = new Date().getFullYear();

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Animation controls for scroll reveal
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  const socialLinks: SocialLinkProps[] = [
    {
      href: "https://github.com/BCaceress",
      icon: Github,
      label: "GitHub",
      color: "hover:bg-gray-200/30 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300",
      ariaLabel: "GitHub Profile"
    },
    {
      href: "mailto:brunocaceres@live.com",
      icon: Mail,
      label: "Email",
      color: "hover:bg-red-100/50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400",
      ariaLabel: "Email Contact"
    },
    {
      href: "https://www.linkedin.com/in/brunocaceress/",
      icon: Linkedin,
      label: "LinkedIn",
      color: "hover:bg-blue-100/50 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      ariaLabel: "LinkedIn Profile"
    },
    {
      href: "https://www.instagram.com/brunocaceress",
      icon: Instagram,
      label: "Instagram",
      color: "hover:bg-pink-100/50 dark:hover:bg-pink-900/30 text-pink-600 dark:text-pink-400",
      ariaLabel: "Instagram Profile"
    },
    {
      href: "https://wa.me/+555198192701",
      icon: MessageSquare,
      label: "WhatsApp",
      color: "hover:bg-green-100/50 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400",
      ariaLabel: "WhatsApp Contact"
    },
  ];

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="relative w-full py-12 px-6 md:px-12 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-[400px] -right-[400px] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute -bottom-[400px] -left-[400px] w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-green-500/5 to-blue-500/5 dark:from-green-500/10 dark:to-blue-500/10"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Back to top button - Updated position */}
        <div className="absolute right-8 bottom-10 md:right-10 md:bottom-10 z-10">
          <motion.button
            onClick={scrollToTop}
            className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl dark:shadow-gray-800/30 transition-all duration-300 group"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
          >
            <ArrowUp size={20} className="text-blue-600 dark:text-blue-400 group-hover:animate-bounce" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          {/* Left column - Brand */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              &lt;BC /&gt;
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-xs">
              {footerText.tagline}
            </p>
          </motion.div>

          {/* Right column - Social */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <h3 className="text-sm uppercase font-semibold tracking-wider text-gray-500 dark:text-gray-400 mb-4">
              {footerText.findMe || "Connect With Me"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social, index) => (
                <SocialLink
                  key={index}
                  href={social.href}
                  icon={social.icon}
                  label={social.label}
                  color={social.color}
                  ariaLabel={social.ariaLabel}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom copyright */}
        <motion.div
          variants={itemVariants}
          className="pt-6 mt-10 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left mb-4 md:mb-0">
            © {currentYear} Bruno Caceres. {footerText.allRights || "All rights reserved."}
          </p>

          <div className="flex items-center group">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {footerText.designedAndCoded || "Designed & Coded with"}{" "}
            </span>
            <Heart
              size={16}
              className="inline text-red-500 group-hover:animate-heartbeat mx-1"
              aria-hidden="true"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {footerText.by || "by"} Bruno Caceres
            </span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default memo(Footer);
