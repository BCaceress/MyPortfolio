"use client";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronLeft, ChevronRight, ExternalLink, Github, X } from "lucide-react";
import Image from 'next/image';
import { FC, Fragment, useCallback, useMemo, useState } from "react";

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

// Modal de detalhes do projeto
interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  isOpen: boolean;
}

const ProjectModal: FC<ProjectModalProps> = ({ project, onClose, isOpen }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm overflow-y-auto" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho do modal */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-10">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{project.title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Fechar detalhes"
          >
            <X size={24} />
          </button>
        </div>

        {/* Conteúdo do modal */}
        <div className="p-6">
          {/* Galeria de imagens */}
          {project.images && project.images.length > 0 && (
            <div className="mb-8">
              <div className="relative rounded-lg overflow-hidden aspect-video bg-gray-200 dark:bg-gray-800">
                <Image
                  src={project.images[currentImageIndex].src}
                  alt={project.images[currentImageIndex].alt}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />

                {/* Navegação da galeria */}
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <button
                    onClick={handlePrevImage}
                    className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all"
                    aria-label="Imagem anterior"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all"
                    aria-label="Próxima imagem"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>

                {/* Indicador de imagem atual */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
                  {project.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex
                        ? "bg-white w-4"
                        : "bg-white bg-opacity-50 hover:bg-opacity-70"
                        }`}
                      aria-label={`Ver imagem ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center italic">
                {project.images[currentImageIndex].alt}
              </p>
            </div>
          )}

          {/* Descrição detalhada */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Sobre o projeto</h4>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Funcionalidades */}
          {project.features && (
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Principais funcionalidades</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                {project.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Tecnologias */}
          {project.technologies && (
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Tecnologias utilizadas</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                {project.technologies.map((tech, idx) => (
                  <li key={idx}>{tech}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-blue-600 dark:bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-4 mt-8">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Github size={18} />
                Ver repositório
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <ExternalLink size={18} />
                Ver demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para o Card de Projeto
const ProjectCard: FC<{ project: Project; index: number; onClick: () => void }> = ({ project, index, onClick }) => {
  return (
    <div
      className="keen-slider__slide p-2"
      data-testid={`project-card-${index}`}
    >
      <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1">
        <div className="relative overflow-hidden aspect-video">
          <Image
            src={project.image}
            alt={`Imagem do projeto: ${project.title}`}
            width={600}
            height={400}
            className="w-full object-cover"
            priority={index < 2} // Prioriza o carregamento dos primeiros cards
          />
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
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-600 dark:bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-4 flex-wrap">
              <button
                onClick={onClick}
                className="flex items-center text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                aria-label={`Ver mais detalhes sobre ${project.title}`}
              >
                <ChevronDown size={16} className="mr-1" /> Ver detalhes
              </button>

              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  aria-label={`Ver repositório do projeto ${project.title}`}
                >
                  <Github size={16} className="mr-1" /> Repositório
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  aria-label={`Ver demonstração do projeto ${project.title}`}
                >
                  <ExternalLink size={16} className="mr-1" /> Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para o botão de navegação do slider
interface NavButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  direction: "left" | "right";
  disabled?: boolean;
}

const NavButton: FC<NavButtonProps> = ({ onClick, icon, direction, disabled }) => {
  return (
    <button
      className={`
        hidden md:flex items-center justify-center absolute top-1/2 transform -translate-y-1/2 
        ${direction === "left" ? "-left-12" : "-right-12"}
        bg-gray-700 text-white p-3 rounded-full shadow-lg 
        hover:bg-gray-600 transition dark:bg-gray-600 dark:hover:bg-gray-500
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
        disabled:opacity-40 disabled:cursor-not-allowed
      `}
      onClick={onClick}
      disabled={disabled}
      aria-label={`Navegar para ${direction === "left" ? "anterior" : "próximo"} slide`}
    >
      {icon}
    </button>
  );
};

const Projects: FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
  }, [currentSlide, slidesPerView.desktop]); 

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
        className="flex min-h-screen items-center justify-center p-3 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
        aria-label="Projetos"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <div className="w-full max-w-6xl space-y-10">
          {/* Cabeçalho com animação sutil */}
          <div className="text-center animate-fadeIn">
            <h2 className="text-3xl md:text-4xl text-blue-500 dark:text-blue-400 font-semibold mb-5 inline-flex items-center">
              <span className="inline-block mr-2 animate-pulse">{"> "}</span>
              <span className="relative">
                Projects
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500 dark:bg-blue-400 rounded-full transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              </span>
            </h2>
            <p className="text-center mb-8 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              A Showcase of Creativity, Problem-Solving, and Technical Excellence!
            </p>
          </div>

          {/* Slider com navegação acessível */}
          <div className="relative" aria-roledescription="carousel" aria-label="Projetos desenvolvidos">
            {/* Botões de navegação */}
            <NavButton
              onClick={handlePrev}
              icon={<ChevronLeft size={28} />}
              direction="left"
              disabled={isBeginning}
            />

            {/* Área do slider com projetos */}
            <div
              ref={sliderRef}
              className="keen-slider focus:outline-none rounded-xl overflow-hidden"
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
              icon={<ChevronRight size={28} />}
              direction="right"
              disabled={isEnd}
            />

            {/* Controles de navegação para dispositivos móveis */}
            <div className="md:hidden flex justify-between mt-4">
              <button
                onClick={handlePrev}
                disabled={isBeginning}
                className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full disabled:opacity-40"
                aria-label="Anterior"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                disabled={isEnd}
                className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full disabled:opacity-40"
                aria-label="Próximo"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Indicadores de página (Dots) */}
          <div
            className="flex justify-center gap-2 mt-6"
            role="tablist"
            aria-label="Navegação de slides"
          >
            {Array.from({ length: totalDots }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleGoToSlide(index)}
                className={`h-3 w-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${currentSlide === index
                  ? "bg-blue-600 w-6"
                  : "bg-gray-400 hover:bg-gray-500"
                  }`}
                aria-label={`Ir para slide ${index + 1}`}
                aria-selected={currentSlide === index}
                role="tab"
              />
            ))}
          </div>
        </div>
      </section>

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
