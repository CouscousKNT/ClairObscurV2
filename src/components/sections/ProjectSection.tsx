import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { Project } from "../../projectsList";

// Interface pour les props du composant
interface ProjectSectionProps {
  project: Project;
}

export const ProjectSection: React.FC<ProjectSectionProps> = ({ project }) => {
  const navigate = useNavigate();

  const handleProjectClick = () => {
    // Rediriger vers l'URL du projet
    navigate(project.projectUrl);
  };

  return (
    <section className="relative w-screen h-screen overflow-hidden">
      {/* Vidéo de fond - clickable */}
      <div
        onClick={handleProjectClick}
        className="cursor-pointer w-full h-full"
      >
        <video
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={project.preview} type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
      </div>

      {/* Contenu */}
      <div className="absolute inset-x-0 bottom-0 m-8 flex w-screen flex-row justify-between md:m-16 lg:m-20 xl:m-28">
        <div className="z-10 flex flex-col font-fujiwara-black-italic mix-blend-difference">
          <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl xl:whitespace-nowrap">
            {project.brand.toUpperCase()}
          </h1>
          <h2 className="text-sm font-bold text-white sm:text-base md:text-xl lg:text-2xl xl:text-3xl">
            {project.name}
          </h2>
        </div>

        {/* Affichage conditionnel de la section description */}
        {project.description && (
          <div className="hidden w-full items-center justify-center gap-6 lg:flex lg:flex-row">
            <div className="h-full border-r border-white/50" />
            <p className="w-96 font-fujiwara-black-italic text-sm text-white/90">
              {project.description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectSection;
