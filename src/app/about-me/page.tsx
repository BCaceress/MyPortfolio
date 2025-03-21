"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function AboutMe() {
  const { language } = useLanguage();
  const aboutMeText = (translations[language] ?? translations["en"]).aboutMe;

  // References for scroll animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);

  // Check if elements are in view
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 });
  const isProfileInView = useInView(profileRef, { once: true, amount: 0.5 });
  const isCodeInView = useInView(codeRef, { once: true, amount: 0.3 });
  const isBioInView = useInView(bioRef, { once: true, amount: 0.3 });

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  const codeBlockVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div
      ref={sectionRef}
      id="about"
      className="relative flex min-h-screen items-center justify-center py-20 px-4 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
    >
      {/* Background elements with parallax effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity }}
      >
        <motion.div
          className="absolute top-20 -left-24 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-20 dark:opacity-10"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute bottom-20 -right-24 w-80 h-80 bg-emerald-500 rounded-full filter blur-3xl opacity-20 dark:opacity-10"
          style={{ y: y2 }}
        />
      </motion.div>

      <div className="w-full max-w-6xl z-10">
        {/* Section Title */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: -20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >

          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
            <span className="text-blue-600 dark:text-blue-400 inline-block mr-3">{">"}</span>
            {aboutMeText.title}
          </h2>
          <motion.p
            className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isTitleInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {aboutMeText.subtitle}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Profile and Code */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Profile Picture */}
            <motion.div
              ref={profileRef}
              className="flex justify-center"
              variants={itemVariants}
              initial="hidden"
              animate={isProfileInView ? "visible" : "hidden"}
            >
              <div className="relative">
                {/* Outer ring with gradient */}
                <div className="absolute inset-0 rounded-full p-1 bg-gradient-to-br from-blue-500 to-emerald-500 shadow-lg blur-[2px]" />

                {/* Profile container */}
                <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full p-1 bg-gradient-to-br from-blue-400 to-emerald-400">
                  <div className="relative flex items-center justify-center w-full h-full rounded-full bg-white dark:bg-gray-800 overflow-hidden border-2 border-white dark:border-gray-700">
                    <Image
                      src="https://media.licdn.com/dms/image/v2/D4D03AQETXx5WaE1E2g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1698632242528?e=1744243200&v=beta&t=f5ma99k0OoqhPnDB8q9MT1sy4Xe9wXVMHVmy6XHlCh0"
                      alt="Bruno Caceres"
                      fill
                      sizes="(max-width: 768px) 256px, 288px"
                      priority
                      className="object-cover rounded-full"
                    />

                    {/* Decoration elements */}
                    <motion.div
                      className="absolute -bottom-1 -right-1 w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl"
                      animate={{
                        rotate: [0, 5, 0, -5, 0],
                        scale: [1, 1.05, 1, 0.95, 1]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 6
                      }}
                    >
                      <span className="text-sm font-mono font-bold">&lt;/&gt;</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Code Block */}
            <motion.div
              ref={codeRef}
              variants={codeBlockVariants}
              initial="hidden"
              animate={isCodeInView ? "visible" : "hidden"}
              className="w-full max-w-lg mx-auto"
            >
              <div className="bg-gray-900 rounded-lg shadow-xl border border-gray-700 overflow-hidden">
                {/* IDE Header */}
                <div className="flex items-center px-4 py-3 bg-gray-800 border-b border-gray-700">
                  <div className="flex space-x-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  </div>
                  <span className="ml-4 text-gray-400 text-sm font-medium">aboutMe.js</span>
                  <div className="ml-auto flex items-center space-x-3 text-gray-400">
                    <span className="text-xs">JavaScript</span>
                  </div>
                </div>

                {/* IDE Content */}
                <div className="px-5 py-4 text-gray-100 font-mono text-sm overflow-x-auto">
                  <CodeBlock code={aboutMeText.codeSnippet} isInView={isCodeInView} />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - Bio text */}
          <motion.div
            ref={bioRef}
            initial={{ opacity: 0, x: 30 }}
            animate={isBioInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg">
              {/* Subtle corner accent */}
              <div className="absolute top-0 left-0 w-20 h-20 overflow-hidden">
                <div className="absolute top-0 left-0 w-5 h-5 bg-blue-500 dark:bg-blue-600 transform -translate-y-1/2 -translate-x-1/2 rotate-45"></div>
              </div>

              {/* Bio content */}
              <div className="relative prose prose-lg dark:prose-invert max-w-none">
                <pre className="whitespace-pre-wrap font-sans leading-relaxed text-gray-700 dark:text-gray-200">
                  {aboutMeText.commentBlock}
                </pre>
              </div>

              {/* Bottom decoration */}
              <div className="absolute bottom-3 right-4 text-blue-500 dark:text-blue-400 opacity-20 font-mono text-4xl font-bold">
                &lt;/&gt;
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Component to animate code appearing line by line
const CodeBlock = ({ code, isInView }: { code: string, isInView: boolean }) => {
  const lines = code.split('<br />');

  return (
    <div className="font-mono">
      {lines.map((line, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{
            duration: 0.5,
            delay: isInView ? 0.1 + index * 0.1 : 0
          }}
          dangerouslySetInnerHTML={{ __html: line }}
        />
      ))}
    </div>
  );
};
