"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { motion } from "framer-motion";
import Image from "next/image";
import { memo } from "react";

// Definição da interface para Skill
interface Skill {
  name: string;
  logo: string;
  category: string;
}

// Interface para os props do componente SkillCard
interface SkillCardProps {
  skill: Skill;
  index: number;
}

// Componente SkillCard memoizado para evitar re-renderizações desnecessárias
const SkillCard = memo(({ skill, index }: SkillCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
      }}
      className="flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800 
                border border-gray-100 dark:border-gray-700 hover:border-blue-300 
                dark:hover:border-blue-500 transition-all duration-300"
      aria-label={`Skill: ${skill.name}`}
    >
      <div className="relative w-16 h-16 mb-3">
        <Image
          src={skill.logo}
          alt={`${skill.name} logo`}
          fill
          sizes="(max-width: 768px) 40px, 60px"
          priority={index < 8}
          className="object-contain"
        />
      </div>
      <p className="text-center font-medium text-gray-800 dark:text-gray-200">
        {skill.name}
      </p>
    </motion.div>
  );
});

SkillCard.displayName = "SkillCard";

export default function Skills() {
  const { language } = useLanguage();
  const skillsText = (translations[language] || translations["en"]).skills;

  // Dados das skills com tipagem definida e categorização
  const skills: Skill[] = [
    // Frontend
    { name: "JavaScript", logo: "/images/icon-javascript.svg", category: "frontend" },
    { name: "TypeScript", logo: "/images/icon-typescript.svg", category: "frontend" },
    { name: "React", logo: "/images/icon-react.svg", category: "frontend" },
    { name: "Next.js", logo: "/images/icon-nextjs.svg", category: "frontend" },
    { name: "Vue.js", logo: "/images/icon-vuejs.svg", category: "frontend" },
    { name: "Nuxt.js", logo: "/images/icon-nuxt.svg", category: "frontend" },
    { name: "ReactNative", logo: "/images/icon-react.svg", category: "mobile" },
    // Styling
    { name: "Bootstrap", logo: "/images/icon-bootstrap.svg", category: "styling" },
    { name: "Tailwind", logo: "/images/icon-tailwind.svg", category: "styling" },
    { name: "Sass", logo: "/images/icon-sass.svg", category: "styling" },
    { name: "Figma", logo: "/images/icon-figma.svg", category: "design" },
    // Backend
    { name: "Node.js", logo: "/images/icon-nodejs.svg", category: "backend" },
    { name: "Laravel", logo: "/images/icon-laravel.svg", category: "backend" },
    // Tools & Database
    { name: "Git", logo: "/images/icon-git.svg", category: "tools" },
    { name: "PostgreSQL", logo: "/images/icon-postgresql.svg", category: "database" },
    { name: "MySQL", logo: "/images/icon-mysql.svg", category: "database" },
  ];

  return (
    <section
      id="skills"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 
                dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2
            id="skills-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text 
                      bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 
                      dark:to-blue-300 mb-4"
          >
            {skillsText.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {skillsText.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={`${skill.name}-${index}`} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
