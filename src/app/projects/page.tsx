"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronLeft, ChevronRight, ExternalLink, Github, X } from "lucide-react";
import Image from 'next/image';
import { FC, Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";

// Tipagem para melhorar a manutenção do código
interface ProjectImage {
  src: string;
  alt: string;
}

interface Project {
  title: string;
  description: string;
  longDescription?: string;
  repo?: string;
  demo?: string;
  tags: string[];
  image: string;
  images?: ProjectImage[];
  features?: string[];
  technologies?: string[];
}

// Dados movidos para um arquivo separado (simulado aqui)
const projects: Project[] = [
  {
    title: "Sistema de Suporte e Monitoramento",
    description:
      "Desenvolvido em 2019, este sistema foi criado para otimizar o trabalho da equipe de suporte da empresa, integrando APIs para cadastro de clientes, alertas críticos, repositório de documentos e vários dashboards de monitoramento em tempo real.",
    longDescription:
      "Desenvolvido em 2019, este sistema foi criado para otimizar o trabalho da equipe de suporte da empresa. O projeto integra múltiplas APIs para fornecer uma solução completa que inclui cadastro detalhado de clientes, sistema de alertas para situações críticas, repositório organizado de documentação técnica e dashboards de monitoramento em tempo real. Ainda ativo e em constante evolução, tornou-se uma ferramenta essencial para a gestão e suporte técnico da empresa, melhorando significativamente a eficiência da equipe e a satisfação dos clientes.",
    tags: ["Laravel", "Bootstrap", "MySQL"],
    image: "/images/projetos/ProjetoSawluz.jpg",
    images: [
      { src: "/images/projetos/ProjetoSawluz.jpg", alt: "Dashboard principal" },
      { src: "/images/projetos/ProjetoSawluz_2.jpg", alt: "Tela de monitoramento" },
      { src: "/images/projetos/ProjetoSawluz_3.jpg", alt: "Gestão de clientes" }
    ],
    features: [
      "Monitoramento em tempo real de servidores e serviços",
      "Sistema de notificações automáticas por email e SMS",
      "Repositório de documentos técnicos com controle de versão",
      "Dashboard personalizado por perfil de usuário",
      "Integração com APIs de serviços externos"
    ],
    technologies: [
      "Backend: Laravel 6.0, PHP 7.3",
      "Frontend: Bootstrap 4, jQuery, Chart.js",
      "Banco de dados: MySQL 5.7",
      "API RESTful",
      "Serviços AWS (S3, SES)"
    ]
  },
  {
    title: "Site Psicóloga",
    description:
      "Site profissional da psicóloga Simone Caceres, apresentando sua trajetória, abordagem terapêutica e local de atendimento. Conta com um blog com conteúdos sobre saúde mental.",
    longDescription:
      "Site profissional desenvolvido para a psicóloga Simone Caceres, com o objetivo de fortalecer sua presença digital e facilitar o contato com potenciais pacientes. O projeto apresenta de forma clara e acolhedora sua trajetória profissional, abordagem terapêutica e informações sobre o local de atendimento. Um diferencial importante é o blog integrado, com publicações regulares sobre saúde mental, psicologia e bem-estar, criando valor adicional para visitantes e melhorando o SEO do site. A solução inclui formulário de contato e integração com sistemas de agendamento online.",
    demo: "https://www.psicologasimonecaceres.com.br/",
    tags: ["React", "TypeScript", "Tailwind"],
    image: "/images/projetos/ProjetoSimoneCaceres.png",
    images: [
      { src: "/images/projetos/ProjetoSimoneCaceres.png", alt: "Página inicial" },
      { src: "/images/projetos/ProjetoSimoneCaceres_2.png", alt: "Blog" },
      { src: "/images/projetos/ProjetoSimoneCaceres_3.png", alt: "Página de contato" }
    ],
    features: [
      "Design responsivo otimizado para todos os dispositivos",
      "Blog integrado com sistema de categorias",
      "SEO otimizado para termos relacionados à psicologia",
      "Formulário de contato integrado",
      "Sistema de agendamento online"
    ],
    technologies: [
      "React com TypeScript",
      "Tailwind CSS para estilização",
      "NextJS para SSR e otimização",
      "CMS headless para gestão do blog",
      "Integração com Google Analytics e Search Console"
    ]
  },
  {
    title: "CLT400 - Gestão de Produção Industrial",
    description:
      "Sistema em desenvolvimento para otimizar o controle da produção industrial. Permite visualizar ordens de fabricação, registrar apontamentos de postos e processos.",
    longDescription:
      "O CLT400 é um sistema completo em desenvolvimento para otimizar o controle da produção industrial. A solução permite visualizar em tempo real todas as ordens de fabricação, registrar apontamentos detalhados de postos e processos, além de oferecer uma gestão eficiente da lista de produtos, materiais e pedidos. Projetado especificamente para atender às necessidades do chão de fábrica, o aplicativo facilita a operação diária e o monitoramento da linha de produção, aumentando a produtividade e reduzindo desperdícios. A interface intuitiva foi desenvolvida com foco no usuário final, garantindo baixa curva de aprendizado.",
    tags: ["React Native", "JavaScript"],
    image: "/images/projetos/ProjetoColetclt400.png",
    images: [
      { src: "/images/projetos/ProjetoColetclt400.png", alt: "Tela principal" },
      { src: "/images/projetos/ProjetoColetclt400_2.png", alt: "Gestão de ordens" },
      { src: "/images/projetos/ProjetoColetclt400_3.png", alt: "Apontamento de produção" }
    ],
    features: [
      "Gestão de ordens de fabricação em tempo real",
      "Registro de apontamentos por código de barras",
      "Monitoramento de KPIs de produção",
      "Controle de material e insumos",
      "Relatórios detalhados de produtividade"
    ],
    technologies: [
      "React Native para desenvolvimento mobile",
      "JavaScript ES6+",
      "Redux para gerenciamento de estado",
      "API RESTful para comunicação com backend",
      "SQLite para armazenamento local"
    ]
  },
  {
    title: "Portfolio Desenvolvedor",
    description:
      "Website desenvolvido para mostrar projetos e habilidades técnicas. Inclui seções de apresentação, projetos, histórico profissional e formulário de contato.",
    longDescription:
      "Website de portfolio profissional desenvolvido para apresentar projetos e habilidades técnicas de forma moderna e interativa. O site conta com seções bem organizadas de apresentação pessoal, showcase de projetos, histórico profissional detalhado e formulário de contato otimizado. Implementado com design totalmente responsivo que se adapta a todos os dispositivos, desde smartphones até grandes monitores. A arquitetura foi planejada para garantir máxima performance, acessibilidade e otimização para mecanismos de busca, resultando em uma experiência de usuário excepcional e tempos de carregamento rápidos.",
    repo: "https://github.com/username/portfolio",
    demo: "https://portfolio.dev",
    tags: ["NextJS", "TypeScript", "TailwindCSS"],
    image: "/images/projetos/ProjetoSawluz.jpg",
    images: [
      { src: "/images/projetos/ProjetoSawluz.jpg", alt: "Página inicial" },
      { src: "/images/projetos/ProjetoSawluz_2.jpg", alt: "Seção de projetos" },
      { src: "/images/projetos/ProjetoSawluz_3.jpg", alt: "Página de contato" }
    ],
    features: [
      "Design responsivo com Tailwind CSS",
      "Modo claro/escuro automático e manual",
      "Animações e transições suaves",
      "Integração com GitHub para exibição de projetos",
      "Formulário de contato com validação e proteção anti-spam"
    ],
    technologies: [
      "Next.js 14 com App Router",
      "TypeScript para tipagem segura",
      "Tailwind CSS para estilização",
      "Framer Motion para animações",
      "Vercel para hospedagem e CI/CD"
    ]
  }
];

// Modal de detalhes do projeto com animações aprimoradas
interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  isOpen: boolean;
}

const ProjectModal: FC<ProjectModalProps> = ({ project, onClose, isOpen }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isContentInView = useInView(contentRef, { once: true, amount: 0.2 });

  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? (project.images?.length || 1) - 1 : prev - 1
    );
  }, [project.images]);

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === (project.images?.length || 1) - 1 ? 0 : prev + 1
    );
  }, [project.images]);

  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && project.images && project.images.length > 1) handlePrevImage();
      if (e.key === 'ArrowRight' && project.images && project.images.length > 1) handleNextImage();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose, project.images, handlePrevImage, handleNextImage]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        ref={modalRef}
        className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {/* Cabeçalho do modal */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-10">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 bg-clip-text text-transparent">
            {project.title}
          </h3>
          <motion.button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Fechar detalhes"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={24} className="text-gray-700 dark:text-gray-300" />
          </motion.button>
        </div>

        {/* Conteúdo do modal */}
        <div className="p-6" ref={contentRef}>
          {/* Galeria de imagens com animações */}
          {project.images && project.images.length > 0 && (
            <div className="mb-8">
              <div className="relative rounded-lg overflow-hidden aspect-video bg-gray-100 dark:bg-gray-800">
                <motion.div
                  key={currentImageIndex} // Force re-render on image change
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={project.images[currentImageIndex].src}
                    alt={project.images[currentImageIndex].alt}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Navegação da galeria */}
                {project.images.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between p-4">
                    <motion.button
                      onClick={handlePrevImage}
                      className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all"
                      aria-label="Imagem anterior"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowLeft size={20} />
                    </motion.button>
                    <motion.button
                      onClick={handleNextImage}
                      className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all"
                      aria-label="Próxima imagem"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowRight size={20} />
                    </motion.button>
                  </div>
                )}

                {/* Indicador de imagem atual */}
                {project.images.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
                    {project.images.map((_, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex
                          ? "bg-white w-6"
                          : "bg-white bg-opacity-50 hover:bg-opacity-70"
                          }`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Ver imagem ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center italic">
                {project.images[currentImageIndex].alt}
              </p>
            </div>
          )}

          {/* Content sections with staggered animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isContentInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          >
            {/* Descrição detalhada */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center">
                <span className="bg-blue-600 dark:bg-blue-500 w-2 h-6 mr-2 rounded-sm"></span>
                Sobre o projeto
              </h4>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </motion.div>

            {/* Funcionalidades */}
            {project.features && (
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center">
                  <span className="bg-green-600 dark:bg-green-500 w-2 h-6 mr-2 rounded-sm"></span>
                  Principais funcionalidades
                </h4>
                <ul className="list-none pl-4 space-y-2 text-gray-700 dark:text-gray-300">
                  {project.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.3, delay: 0.1 + idx * 0.05 }}
                    >
                      <span className="text-green-500 dark:text-green-400 mr-2 text-lg">•</span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Tecnologias */}
            {project.technologies && (
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center">
                  <span className="bg-purple-600 dark:bg-purple-500 w-2 h-6 mr-2 rounded-sm"></span>
                  Tecnologias utilizadas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <motion.span
                      key={idx}
                      className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isContentInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tags */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center">
                <span className="bg-blue-600 dark:bg-blue-500 w-2 h-6 mr-2 rounded-sm"></span>
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <motion.span
                    key={idx}
                    className="bg-blue-600 dark:bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: 0.3 + idx * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Links */}
            {(project.repo || project.demo) && (
              <motion.div
                className="flex gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {project.repo && (
                  <motion.a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-5 py-2.5 rounded-lg transition-colors"
                    whileHover={{ scale: 1.03, translateY: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github size={18} />
                    Ver repositório
                  </motion.a>
                )}
                {project.demo && (
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 dark:from-blue-500 dark:to-blue-400 dark:hover:from-blue-600 dark:hover:to-blue-500 text-white px-5 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg"
                    whileHover={{ scale: 1.03, translateY: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink size={18} />
                    Ver demo
                  </motion.a>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Componente para o Card de Projeto com animações aprimoradas
const ProjectCard: FC<{ project: Project; index: number; onClick: () => void }> = ({ project, index, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isCardInView = useInView(cardRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={cardRef}
      className="keen-slider__slide p-2"
      initial={{ opacity: 0, y: 30 }}
      animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      data-testid={`project-card-${index}`}
    >
      <motion.div
        className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col transform hover:-translate-y-2"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="relative overflow-hidden aspect-video group">
          <Image
            src={project.image}
            alt={`Imagem do projeto: ${project.title}`}
            width={600}
            height={400}
            className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
            priority={index < 2} // Prioriza o carregamento dos primeiros cards
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex space-x-3">
              {project.repo && (
                <motion.a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-40 transition-colors"
                  aria-label={`Ver repositório do projeto ${project.title}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={18} />
                </motion.a>
              )}
              {project.demo && (
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-40 transition-colors"
                  aria-label={`Ver demonstração do projeto ${project.title}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={18} />
                </motion.a>
              )}
            </div>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            {project.title}
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400 flex-1 line-clamp-3 mb-4">
            {project.description}
          </p>
          <div className="mt-auto space-y-4">
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-3 py-1 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="text-gray-500 dark:text-gray-400 text-xs px-2 py-1 font-medium">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>

            <div className="flex justify-center">
              <motion.button
                onClick={onClick}
                className="flex items-center justify-center w-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors"
                aria-label={`Ver mais detalhes sobre ${project.title}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Ver detalhes</span>
                <ChevronDown size={16} className="ml-1" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Componente para o botão de navegação do slider com animações
interface NavButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  direction: "left" | "right";
  disabled?: boolean;
}

const NavButton: FC<NavButtonProps> = ({ onClick, icon, direction, disabled }) => {
  return (
    <motion.button
      className={`
        hidden md:flex items-center justify-center absolute top-1/2 transform -translate-y-1/2 
        ${direction === "left" ? "-left-12" : "-right-12"}
        bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded-full shadow-lg 
        hover:bg-gray-100 dark:hover:bg-gray-700 transition-all
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
        disabled:opacity-40 disabled:cursor-not-allowed z-10
      `}
      onClick={onClick}
      disabled={disabled}
      aria-label={`Navegar para ${direction === "left" ? "anterior" : "próximo"} slide`}
      whileHover={!disabled ? { scale: 1.1 } : undefined}
      whileTap={!disabled ? { scale: 0.9 } : undefined}
      initial={{ opacity: 0, x: direction === "left" ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {icon}
    </motion.button>
  );
};

const Projects: FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, amount: 0.5 });

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const slidesPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  };

  // Configuração do slider com useKeenSlider
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    mode: "snap",
    slides: { perView: slidesPerView.desktop, spacing: 24 },
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: slidesPerView.mobile, spacing: 16 },
      },
      "(min-width: 769px) and (max-width: 1024px)": {
        slides: { perView: slidesPerView.tablet, spacing: 24 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  // Memoização do cálculo dos indicadores de páginas
  const { totalDots, isBeginning, isEnd } = useMemo(() => {
    const maxSlidesPerView = Math.min(projects.length, slidesPerView.desktop);
    const totalDots = Math.max(1, projects.length - maxSlidesPerView + 1);
    const isBeginning = currentSlide === 0;
    const isEnd = currentSlide === totalDots - 1;
    return { totalDots, isBeginning, isEnd };
  }, [currentSlide, projects.length, slidesPerView.desktop]);

  // Callbacks para navegação
  const handlePrev = useCallback(() => instanceRef.current?.prev(), [instanceRef]);
  const handleNext = useCallback(() => instanceRef.current?.next(), [instanceRef]);
  const handleGoToSlide = useCallback(
    (idx: number) => instanceRef.current?.moveToIdx(idx),
    [instanceRef]
  );

  // Gerenciamento do modal
  const openProjectDetails = useCallback((project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden'; // Previne scroll no background
  }, []);

  const closeProjectDetails = useCallback(() => {
    setSelectedProject(null);
    document.body.style.overflow = ''; // Restaura scroll
  }, []);

  // Listener de teclado para navegação acessível
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    },
    [handlePrev, handleNext]
  );

  return (
    <Fragment>
      <section
        id="projects"
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center p-4 md:p-8 lg:p-12 overflow-hidden"
        aria-label="Projetos"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {/* Background decoration with parallax */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 z-0">
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ opacity }}
          >
            <motion.div
              className="absolute top-40 -left-20 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl opacity-10 dark:opacity-5"
              style={{ y: y1 }}
            />
            <motion.div
              className="absolute bottom-40 -right-20 w-80 h-80 bg-emerald-300 rounded-full filter blur-3xl opacity-10 dark:opacity-5"
              style={{ y: y2 }}
            />

            {/* Grid pattern in the background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]"></div>

            {/* Decorative code elements */}
            <div className="absolute top-20 left-10 text-5xl text-gray-200 dark:text-gray-800 font-mono opacity-20 hidden lg:block">{'['}</div>
            <div className="absolute bottom-20 right-10 text-5xl text-gray-200 dark:text-gray-800 font-mono opacity-20 hidden lg:block">{']'}</div>
          </motion.div>
        </div>

        <div className="w-full max-w-7xl space-y-12 z-10 relative">
          {/* Section Header with animation */}
          <motion.div
            ref={headingRef}
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              <span className="text-blue-600 dark:text-blue-400 inline-block mr-3">{">"}</span>
              Projects
            </h2>

            <motion.p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={isHeadingInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              A Showcase of Creativity, Problem-Solving, and Technical Excellence!
            </motion.p>
          </motion.div>

          {/* Slider com navegação acessível */}
          <div
            className="relative px-2 sm:px-6 md:px-10 lg:px-16"
            aria-roledescription="carousel"
            aria-label="Projetos desenvolvidos"
          >
            {/* Botões de navegação */}
            <NavButton
              onClick={handlePrev}
              icon={<ChevronLeft size={24} />}
              direction="left"
              disabled={isBeginning}
            />

            {/* Área do slider com projetos */}
            <div
              ref={sliderRef}
              className="keen-slider focus:outline-none overflow-visible"
              role="region"
              aria-live="polite"
            >
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  index={index}
                  onClick={() => openProjectDetails(project)}
                />
              ))}
            </div>

            <NavButton
              onClick={handleNext}
              icon={<ChevronRight size={24} />}
              direction="right"
              disabled={isEnd}
            />

            {/* Controles de navegação para dispositivos móveis */}
            <div className="md:hidden flex justify-between mt-8">
              <motion.button
                onClick={handlePrev}
                disabled={isBeginning}
                className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-md disabled:opacity-40 text-gray-800 dark:text-gray-200"
                whileHover={!isBeginning ? { scale: 1.1 } : undefined}
                whileTap={!isBeginning ? { scale: 0.9 } : undefined}
                aria-label="Anterior"
              >
                <ChevronLeft size={20} />
              </motion.button>
              <motion.button
                onClick={handleNext}
                disabled={isEnd}
                className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-md disabled:opacity-40 text-gray-800 dark:text-gray-200"
                whileHover={!isEnd ? { scale: 1.1 } : undefined}
                whileTap={!isEnd ? { scale: 0.9 } : undefined}
                aria-label="Próximo"
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </div>

          {/* Indicadores de página (Dots) */}
          <div
            className="flex justify-center gap-2 mt-8"
            role="tablist"
            aria-label="Navegação de slides"
          >
            {Array.from({ length: totalDots }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleGoToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${currentSlide === index
                  ? "bg-blue-600 w-8"
                  : "bg-gray-300 dark:bg-gray-600 w-2 hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Ir para slide ${index + 1}`}
                aria-selected={currentSlide === index}
                role="tab"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Animated Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={closeProjectDetails}
          isOpen={!!selectedProject}
        />
      )}
    </Fragment>
  );
};

export default Projects;