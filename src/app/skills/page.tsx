"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { memo, useRef, useState } from "react";

/**
 * Interface representing a skill with its properties
 */
interface Skill {
  name: string;
  logo: string;
  category: string;
}

/**
 * Props for the SkillCard component
 */
interface SkillCardProps {
  skill: Skill;
  index: number;
}

/**
 * Memoized SkillCard component with enhanced design
 */
const SkillCard = memo(({ skill, index }: SkillCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: "easeOut"
      }}
      layout
      whileHover={{
        y: -5,
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      className="flex flex-col items-center justify-center p-5 rounded-xl bg-white dark:bg-gray-800 
                border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-lg 
                dark:shadow-gray-900/30 transition-all duration-300 relative overflow-hidden group"
      aria-label={`Skill: ${skill.name}`}
    >
      {/* Hover effect background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-blue-100 
                    dark:from-blue-900/20 dark:to-blue-800/20 opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300"></div>

      {/* Skill icon with container */}
      <div className="relative z-10 w-16 h-16 flex items-center justify-center mb-4 
                    bg-gray-50 dark:bg-gray-700 rounded-full p-3
                    group-hover:bg-white dark:group-hover:bg-gray-700 transition-colors duration-300">
        <div className="relative w-full h-full">
          <Image
            src={skill.logo}
            alt={`${skill.name} logo`}
            fill
            sizes="64px"
            priority={index < 8}
            className="object-contain p-1 transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Skill name */}
      <p className="relative z-10 text-center font-medium text-gray-800 dark:text-gray-200 transition-colors duration-300">
        {skill.name}
      </p>
    </motion.div>
  );
});

SkillCard.displayName = "SkillCard";

// Component for filter buttons
const FilterButtons = ({
  categories,
  activeFilter,
  setActiveFilter,
  language
}: {
  categories: { id: string, title: string }[],
  activeFilter: string,
  setActiveFilter: (filter: string) => void,
  language: string
}) => {
  // Use language prop to determine the "All" button text
  const allButtonText = language === 'en' ? 'All' : 'Todas';

  return (
    <motion.div
      className="flex flex-wrap justify-center gap-3 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <button
        onClick={() => setActiveFilter('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${activeFilter === 'all'
            ? 'bg-blue-600 text-white shadow-md scale-105'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}
      >
        {allButtonText}
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setActiveFilter(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${activeFilter === category.id
              ? 'bg-blue-600 text-white shadow-md scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}
        >
          {category.title}
        </button>
      ))}
    </motion.div>
  );
};

/**
 * Skills page component displaying the developer's technical skills
 */
export default function Skills() {
  const { language } = useLanguage();
  const skillsText = (translations[language] || translations["en"]).skills;
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 });
  const [activeFilter, setActiveFilter] = useState("all");

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Dados das skills organizados por categoria
  const skillsByCategory: Record<string, { title: string; skills: Skill[] }> = {
    frontend: {
      title: "Frontend",
      skills: [
        { name: "JavaScript", logo: "/images/icon-javascript.svg", category: "frontend" },
        { name: "TypeScript", logo: "/images/icon-typescript.svg", category: "frontend" },
        { name: "React", logo: "/images/icon-react.svg", category: "frontend" },
        { name: "Next.js", logo: "/images/icon-nextjs.svg", category: "frontend" },
        { name: "Vue.js", logo: "/images/icon-vuejs.svg", category: "frontend" },
        { name: "Nuxt.js", logo: "/images/icon-nuxt.svg", category: "frontend" },
      ]
    },
    mobile: {
      title: "Mobile",
      skills: [
        { name: "ReactNative", logo: "/images/icon-react.svg", category: "mobile" },
      ]
    },
    styling: {
      title: "Styling & Design",
      skills: [
        { name: "Bootstrap", logo: "/images/icon-bootstrap.svg", category: "styling" },
        { name: "Tailwind", logo: "/images/icon-tailwind.svg", category: "styling" },
        { name: "Sass", logo: "/images/icon-sass.svg", category: "styling" },
        { name: "Figma", logo: "/images/icon-figma.svg", category: "design" },
      ]
    },
    backend: {
      title: "Backend",
      skills: [
        { name: "Node.js", logo: "/images/icon-nodejs.svg", category: "backend" },
        { name: "Laravel", logo: "/images/icon-laravel.svg", category: "backend" },
      ]
    },
    database: {
      title: "Database",
      skills: [
        { name: "PostgreSQL", logo: "/images/icon-postgresql.svg", category: "database" },
        { name: "MySQL", logo: "/images/icon-mysql.svg", category: "database" },
      ]
    },
    tools: {
      title: "Tools & Version Control",
      skills: [
        { name: "Git", logo: "/images/icon-git.svg", category: "tools" },
      ]
    }
  };

  // Prepare categories for filter
  const categories = Object.entries(skillsByCategory).map(([id, category]) => ({
    id,
    title: category.title
  }));

  // Filter and flatten skills based on active filter
  const filteredSkills = activeFilter === "all"
    ? Object.values(skillsByCategory).flatMap(category => category.skills)
    : skillsByCategory[activeFilter]?.skills || [];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-gray-50 to-white 
                dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
      aria-labelledby="skills-heading"
    >
      {/* Background elements with parallax effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity }}
      >
        <motion.div
          className="absolute top-40 -right-20 w-72 h-72 bg-blue-400 rounded-full filter blur-3xl opacity-10 dark:opacity-5"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute bottom-40 -left-20 w-80 h-80 bg-green-400 rounded-full filter blur-3xl opacity-10 dark:opacity-5"
          style={{ y: y2 }}
        />

        {/* Grid pattern background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] dark:opacity-[0.03]"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headingRef}
          className="text-center mb-16"
        >
          <motion.h2
            id="skills-heading"
            className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-blue-600 dark:text-blue-400 inline-block mr-3">{">"}</span>
            {skillsText.title}
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={isHeadingInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {skillsText.subtitle}
          </motion.p>

          {/* Filter Buttons */}
          <FilterButtons
            categories={categories}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            language={language}
          />
        </motion.div>

        {/* Skills Grid with filtering */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <SkillCard
                key={`${skill.name}-${skill.category}`}
                skill={skill}
                index={index}
              />
            ))}
          </AnimatePresence>

          {filteredSkills.length === 0 && (
            <motion.p
              className="col-span-full text-center text-gray-500 dark:text-gray-400 py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {skillsText.noSkillsFound || "No skills found in this category."}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-10 right-10 text-9xl font-bold text-blue-100 dark:text-blue-900/20 opacity-30 select-none hidden lg:block"
        initial={{ opacity: 0, rotate: -10 }}
        animate={{ opacity: 0.2, rotate: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        &lt;/&gt;
      </motion.div>
    </section>
  );
}