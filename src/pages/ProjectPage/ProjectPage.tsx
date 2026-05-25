import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../components/Header";
import { getAllProjects, type Project } from "../../projectsList";
import BlurFadeTextAnimation from "../../components/textAnimations/BlurFadeTextAnimation";
import { useIsMobile } from "../../utils/useIsMobile";

export const ProjectPage: React.FC = () => {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const isMobile = useIsMobile();

  // Fonction pour trouver un projet par son slug (URL)
  const getProjectBySlug = (slug: string): Project | undefined => {
    const projects = getAllProjects();
    return projects.find((project) => {
      // Comparer avec le projectUrl (sans le "/")
      const projectSlug = project.projectUrl.replace("/", "");
      return projectSlug === slug;
    });
  };

  // Récupérer les données du projet à partir du slug
  const project = getProjectBySlug(projectSlug || "");

  // // Scroll en haut de la page au chargement
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [projectSlug]);

  // Si le projet n'existe pas, afficher une erreur

  if (!project) {
    return (
      <>
        <Header />
        <div className="w-full min-h-screen bg-black text-white flex items-center justify-center font-fujiwara-bold">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Projet introuvable</h1>
            <p>Le projet demandé n'existe pas dans notre base de données.</p>
            <Link
              to="/"
              className="mt-8 font-fujiwara-black inline-block text-2xl bg-white rounded-xl text-black py-2 px-4 hover:bg-gray-300 transition-colors"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      className="bg-black min-h-screen text-white overflow-x-hidden relative flex flex-col"
      id={`project_${projectSlug}`}
    >
      {/* Overlay flou en haut */}
      <div className="z-50 fixed w-full h-56 top-0 bg-black/60 backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)] pointer-events-none"></div>

      <Header />

      {/* Hero Section */}
      <section className="relative w-screen h-screen overflow-hidden bg-black">
        <a
          href={`https://vimeo.com/${project.videoUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-20 cursor-pointer"
          aria-label="Voir le film complet sur Vimeo"
        ></a>
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          {project.videoUrl && (
            <iframe
              src={`https://player.vimeo.com/video/${project.videoUrl}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`}
              className="w-[100vw] h-[57vw] min-h-[100vh] min-w-[177.77vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={`Vidéo - ${project.name}`}
            ></iframe>
          )}
        </div>

        {/* Overlay sombre*/}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mix-blend-difference z-10 px-5">
          <h1 className="font-fujiwara-black text-[clamp(3rem,12vw,12rem)] leading-none text-center uppercase tracking-tighter">
            {/* Si vous avez une propriété brand, utilisez-la, sinon le nom */}
            <BlurFadeTextAnimation text={`${project.brand}`} color="white" />
          </h1>
          <h2 className="font-fujiwara-light-italic text-xl md:text-3xl lg:text-5xl mt-4">
            <BlurFadeTextAnimation text={`${project.name}`} color="white" />
          </h2>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 font-fujiwara-black text-xs uppercase tracking-widest">
          <span className="text-center">Cliquez pour découvrir le film</span>
          <span>↓</span>
        </div>
      </section>

      {/* Informations du projet */}
      <section className="w-full px-5 sm:px-10 lg:px-20 py-20 lg:py-32 border-b border-white/10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 font-fujiwara-black uppercase text-xs md:text-sm tracking-widest">
          <div className="flex flex-col gap-2">
            <span className="text-white/40">Projet</span>
            <span>{project.name}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-white/40">Réalisation</span>
            <span>{(project as any).director || "Clair Obscur"}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-white/40">Année</span>
            <span>{project.date || "Non renseignée"}</span>
          </div>
        </div>
      </section>

      {/* Description */}
      {project.description && (
        <section className="w-full px-5 sm:px-10 lg:px-20 py-32 lg:py-48 flex justify-center">
          <h3 className="w-full lg:w-2/3 text-center font-fujiwara-light-italic text-2xl md:text-4xl lg:text-5xl leading-tight">
            "{project.description}"
          </h3>
        </section>
      )}

      {/* Grille d'images */}
      {project.keyImages && project.keyImages.length > 0 && (
        <section className="w-full px-5 sm:px-10 lg:px-20 pb-32 flex flex-col gap-10 lg:gap-32">
          {/* Première image pleine largeur */}
          {project.keyImages[0] && (
            <div className="w-full h-[60vh] lg:h-screen bg-white/5 relative overflow-hidden">
              <img
                src={project.keyImages[0]}
                alt={`${project.name} 1`}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Grille stylisée pour les images 2 et 3 */}
          {(project.keyImages[1] || project.keyImages[2]) && (
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">
              {project.keyImages[1] && (
                <div className="w-full lg:w-1/2 h-[50vh] lg:h-[80vh] bg-white/5 relative overflow-hidden">
                  <img
                    src={project.keyImages[1]}
                    alt={`${project.name} 2`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {project.keyImages[2] && (
                <div className="w-full lg:w-1/2 h-[50vh] lg:h-[60vh] bg-white/5 relative overflow-hidden lg:mt-32">
                  <img
                    src={project.keyImages[2]}
                    alt={`${project.name} 3`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          )}

          {/* Grille normale pour les images 4 et 5 */}
          {project.keyImages.slice(3, 4).map((img, idx) => (
            <div
              key={idx + 3}
              className="w-full h-[50vh] lg:h-screen bg-white/5 relative overflow-hidden"
            >
              <img
                src={img}
                alt={`${project.name} ${idx + 4}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* Grille stylisée pour les images 6 et 7 */}
          {(project.keyImages[5] || project.keyImages[6]) && (
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center">
              {project.keyImages[5] && (
                <div className="w-full lg:w-1/2 h-[50vh] lg:h-[80vh] bg-white/5 relative overflow-hidden">
                  <img
                    src={project.keyImages[5]}
                    alt={`${project.name} 6`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {project.keyImages[6] && (
                <div className="w-full lg:w-1/2 h-[50vh] lg:h-[60vh] bg-white/5 relative overflow-hidden lg:mt-32">
                  <img
                    src={project.keyImages[6]}
                    alt={`${project.name} 7`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          )}

          {/* Grille normale pour les images 8 et plus */}
          {project.keyImages.slice(7).map((img, idx) => (
            <div
              key={idx + 3}
              className="w-full h-[50vh] lg:h-screen bg-white/5 relative overflow-hidden"
            >
              <img
                src={img}
                alt={`${project.name} ${idx + 4}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </section>
      )}

      <section
        className={`w-full h-[50vh] flex flex-col items-center justify-center  border-t border-white/10 group cursor-pointer ${isMobile ? "bg-white/80 text-black" : "bg-[#0a0a0a] hover:bg-white hover:text-black transition-colors"}`}
      >
        <Link
          to="/galerie"
          className="flex flex-col items-center w-full h-full justify-center"
        >
          <span className="font-fujiwara-black text-sm tracking-widest uppercase mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
            Retourner aux
          </span>
          <h2 className="font-fujiwara-black-italic text-4xl sm:text-5xl lg:text-8xl text-center">
            PROJETS
          </h2>
        </Link>
      </section>
    </div>
  );
};

export default ProjectPage;
