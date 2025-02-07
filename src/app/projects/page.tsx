// components/Projects.tsx
import { FC } from 'react';
import { ExternalLink } from 'lucide-react'; // Ícone para o link externo

const ProjectCard: FC<{ title: string; description: string; imageUrl: string; techStack: string[]; isImageLeft: boolean; projectLink?: string }> = 
({ title, description, imageUrl, techStack, isImageLeft, projectLink }) => (
  <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 ">
    {/* Alternância da imagem e do texto */}
    <div className={`w-full md:w-1/2 ${isImageLeft ? 'md:order-1' : 'md:order-2'}`}>
      <img src={imageUrl} alt={title} className="w-full h-auto object-cover rounded-lg shadow-md" />
    </div>
    
    <div className="w-full md:w-1/2 flex flex-col gap-4">
      <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>

      {/* Tecnologias utilizadas */}
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech, index) => (
          <span key={index} className="bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-200 py-1 px-3 rounded-full text-sm">
            {tech}
          </span>
        ))}
      </div>

      {/* Link externo para o projeto */}
      {projectLink && (
        <a href={projectLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-500 dark:text-blue-400 hover:underline">
          <ExternalLink size={20} /> Acessar projeto
        </a>
      )}
    </div>
  </div>
);

const Projects: FC = () => {
  const projects = [
    {
      title: "Fiskil",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec urna ac tellus volutpat viverra.",
      imageUrl: "/images/Picture.png",
      techStack: ['React', 'Next.js', 'Typescript', 'Nest.js', 'PostgreSQL', 'TailwindCSS', 'Figma', 'Cypress', 'Storybook', 'Git'],
      projectLink: "https://github.com/seu-repositorio"
    },
    {
      title: "Outro Projeto",
      description: "Descrição do segundo projeto com detalhes relevantes.",
      imageUrl: "/images/Picture.png",
      techStack: ['Vue.js', 'Vuetify', 'Node.js', 'MongoDB'],
      projectLink: "https://github.com/seu-outro-projeto"
    }
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-6 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 ">
      <div className="w-full max-w-5xl space-y-12">
        {/* Título Centralizado */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl text-blue-500 font-semibold mb-3">{"> "} Projects</h2>
          <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200">escrever alguma mensagem aqui:</p>
        </div>

      <div className="flex flex-col gap-10">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}
            techStack={project.techStack}
            isImageLeft={index % 2 === 0}
            projectLink={project.projectLink}
          />
        ))}
       </div>
      </div>
    </div>
  );
};

export default Projects;
