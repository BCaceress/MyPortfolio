"use client";

import { FC, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Sistema de Suporte e Monitoramento",
    description:
      "Desenvolvido em 2019,  este sistema foi criado para otimizar o trabalho da equipe de suporte da empresa, integrando APIs para cadastro de clientes, alertas críticos, repositório de documentos e vários dashboards de monitoramento em tempo real. Ainda ativo, é essencial para a gestão e suporte.",
    tags: ["Laravel", "Bootstrap", "MySql"],
    image: "/images/projetos/ProjetoSawluz.jpg",
  },
  {
    title: "Site Psicóloga",
    description:
      "Site profissional da psicóloga Simone Caceres, apresentando sua trajetória, abordagem terapêutica e local de atendimento. Conta com um blog com conteúdos sobre saúde mental e links para contato e agendamentos.",
    //repo: "#",
    demo: "https://www.psicologasimonecaceres.com.br/",
    tags: ["React", "TypeScript", "Tailwind"],
    image: "/images/projetos/ProjetoSimoneCaceres.png",
  },
  {
    title: "CLT400 - Gestão de Produção Industrial",
    description:
      "Sistema em desenvolvimento para otimizar o controle da produção industrial. Permite visualizar ordens de fabricação, registrar apontamentos de postos e processos, além de gerenciar a lista de produtos, materiais e pedidos. Projetado para facilitar a operação e o monitoramento da linha de produção.",
    //repo: "#",
    //demo: "#",
    tags: ["React Native", "JavaScript"],
    image: "/images/projetos/ProjetoColetclt400.png",
  },
  {
    title: "Projeto Extra 1",
    description: "Descrição do projeto extra 1.",
    repo: "#",
    demo: "#",
    tags: ["Tag1", "Tag2"],
    image: "/images/projetos/ProjetoSawluz.jpg",
  }
  // Adicione mais projetos se necessário
];

const Projects: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    mode: "snap",
    slides: { perView: 3, spacing: 24 },
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 1, spacing: 16 },
      },
      "(min-width: 769px) and (max-width: 1024px)": {
        slides: { perView: 2, spacing: 24 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  // Cálculo dos indicadores (dots) para 3 cards visíveis.
  const totalDots = projects.length - 3 + 1;

  return (
    <div className="flex min-h-screen items-center justify-center p-3 bg-[#f4f4f4] dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="w-full max-w-6xl space-y-8">
        {/* Cabeçalho */}
        <div className="text-center">
        <h2 className="text-3xl md:text-4xl text-blue-500 dark:text-blue-400 font-semibold mb-5">{"> "} Projects</h2>
            <p className="text-center mb-8 text-lg text-gray-700 dark:text-gray-300">
            A Showcase of Creativity, Problem-Solving, and Technical Excellence!
            </p>
        </div>

        {/* Slider */}
        <div className="relative">
          {/* Botão de Navegação Esquerdo (oculto em mobile) */}
          <button
            className="hidden md:block absolute -left-12 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full shadow-lg hover:bg-gray-600 transition dark:bg-gray-600 dark:hover:bg-gray-500"
            onClick={() => instanceRef.current?.prev()}
          >
            <ChevronLeft size={28} />
          </button>

          <div ref={sliderRef} className="keen-slider">
            {projects.map((project, index) => (
             <div key={index} className="keen-slider__slide p-2">
             <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
             <Image
                src={project.image}
                alt={project.title}
                width={600} 
                height={400} 
               className="w-full aspect-video object-cover"
              />
               <div className="p-4 flex flex-col flex-1">
                 <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                   {project.title}
                 </h3>
                 <p className="mt-3 text-gray-600 dark:text-gray-400 flex-1">
                   {project.description}
                 </p>
                 <div className="mt-4 flex gap-4">
                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <ExternalLink size={16} className="mr-1" /> Repositório
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <ExternalLink size={16} className="mr-1" /> Demo
                    </a>
                  )}
                </div>
                 <div className="mt-4 flex flex-wrap gap-2">
                   {project.tags.map((tag, i) => (
                     <span
                       key={i}
                       className="bg-blue-600 dark:bg-blue-500 text-white text-xs px-2 py-1 rounded-full"
                     >
                       {tag}
                     </span>
                   ))}
                 </div>
               </div>
             </div>
           </div>
           
            ))}
          </div>

          {/* Botão de Navegação Direito (oculto em mobile) */}
          <button
            className="hidden md:block absolute -right-12 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-3 rounded-full shadow-lg hover:bg-gray-600 transition dark:bg-gray-600 dark:hover:bg-gray-500"
            onClick={() => instanceRef.current?.next()}
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Indicadores (Dots) */}
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              onClick={() => instanceRef.current?.moveToIdx(index)}
              className={`h-3 w-3 rounded-full transition ${
                currentSlide === index
                  ? "bg-blue-600"
                  : "bg-gray-400 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
