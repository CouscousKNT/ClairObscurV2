gsap.registerPlugin(ScrollTrigger);
("use client");
import "./sample-project.css";
import { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Header from "../../components/Header";
import {
  getProjectByName,
  getAllProjects,
  type Project,
  type Credits,
} from "../../projectsList";

gsap.registerPlugin(ScrollTrigger);

// Composant pour afficher les crédits
const CreditsSection: React.FC<{ credits: Credits; brand: string }> = ({
  credits,
  brand,
}) => {
  return (
    <article className="mb-12">
      <header className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Crédits</h2>
        <p>
          <strong>Marque :</strong> {brand}
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Réalisation & Production */}
        {credits.realisationProduction && (
          <section>
            <h3 className="uppercase text-sm font-semibold text-gray-600 mb-2">
              Réalisation & Production
            </h3>
            <ul className="space-y-1">
              {credits.realisationProduction.realisation && (
                <li>
                  <strong>Réalisation :</strong>{" "}
                  {credits.realisationProduction.realisation.join(", ")}
                </li>
              )}
              {credits.realisationProduction.producteur && (
                <li>
                  <strong>Producteur :</strong>{" "}
                  {credits.realisationProduction.producteur.join(", ")}
                </li>
              )}
            </ul>
          </section>
        )}

        {/* Image & Son */}
        {credits.imageSon && (
          <section>
            <h3 className="uppercase text-sm font-semibold text-gray-600 mb-2">
              Image & Son
            </h3>
            <ul className="space-y-1">
              {credits.imageSon.dop && (
                <li>
                  <strong>DoP :</strong> {credits.imageSon.dop.join(", ")}
                </li>
              )}
              {credits.imageSon.cameras && (
                <li>
                  <strong>Caméras :</strong>{" "}
                  {credits.imageSon.cameras.join(", ")}
                </li>
              )}
              {credits.imageSon.son && (
                <li>
                  <strong>Son :</strong> {credits.imageSon.son.join(", ")}
                </li>
              )}
            </ul>
          </section>
        )}

        {/* Post-production */}
        {credits.postProduction && (
          <section>
            <h3 className="uppercase text-sm font-semibold text-gray-600 mb-2">
              Post-production
            </h3>
            <ul className="space-y-1">
              {credits.postProduction.montage && (
                <li>
                  <strong>Montage :</strong>{" "}
                  {credits.postProduction.montage.join(", ")}
                </li>
              )}
              {credits.postProduction.etalonnage && (
                <li>
                  <strong>Étalonnage :</strong>{" "}
                  {credits.postProduction.etalonnage.join(", ")}
                </li>
              )}
              {credits.postProduction.vfx && (
                <li>
                  <strong>VFX :</strong> {credits.postProduction.vfx.join(", ")}
                </li>
              )}
            </ul>
          </section>
        )}
      </div>

      <footer className="mt-6 border-t border-gray-200 pt-4 text-sm text-gray-700">
        <p>© 2025 {brand} — Tous droits réservés</p>
      </footer>
    </article>
  );
};

// Fonction pour convertir un nom de projet en slug d'URL
const getSlugFromProjectName = (projectName: string): string => {
  return projectName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/'/g, "")
    .replace(/[àáâãäå]/g, "a")
    .replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i")
    .replace(/[òóôõö]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .replace(/[ç]/g, "c");
};

// Fonction pour trouver un projet par son slug
const getProjectBySlug = (slug: string): Project | undefined => {
  const projects = getAllProjects();
  return projects.find(
    (project) => getSlugFromProjectName(project.name) === slug
  );
};

export const ProjectPage: React.FC = () => {
  const { projectSlug } = useParams<{ projectSlug: string }>();

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

  // Si le projet n'existe pas, afficher une erreur
  if (!project) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Projet introuvable</h1>
          <p>Le projet demandé n'existe pas dans notre base de données.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-screen bg-white relative flex flex-col"
      id={`project_${projectSlug}`}
    >
      <Header />

      <div className="relative mt-32 w-[95vw] mx-auto aspect-video rounded-2xl overflow-hidden shadow-lg">
        <iframe
          src={`https://player.vimeo.com/video/${project.videoUrl}?h=abcd1234&title=0&byline=0&portrait=0&like=0&share=0&watchlater=0`}
          className="w-[95vw] mx-auto aspect-video rounded-2xl overflow-hidden shadow-lg"
          frameBorder="0"
          allow="fullscreen; picture-in-picture"
          allowFullScreen
          title={`Vidéo - ${project.name}`}
        ></iframe>
      </div>

      <section className="relative w-full h-full px-[1.5rem]">
        <div className="w-full">
          <div className="flex flex-col xl:flex-row">
            <div className="relative w-full pr-8 font-fujiwara-medium-italic text-black text-md w-[75%] flex flex-col gap-[1.5rem]">
              <div className="w-full sticky top-24 mt-24 flex flex-col justify-around h-[80vh]">
                <div>
                  <h1 className="font-fujiwara-black-italic pb-4 text-xl">
                    {project.name}
                  </h1>
                  {project.description && (
                    <p className="w-full xl:mr-[1.5rem]">
                      {project.description}
                    </p>
                  )}
                  <br />
                </div>

                {/* Affichage conditionnel des crédits */}
                {project.credits && (
                  <CreditsSection
                    credits={project.credits}
                    brand={project.brand}
                  />
                )}
              </div>
            </div>

            <div className="relative w-full h-full">
              <div className="mt-8 mb-4 flex justify-around">
                <p className="opacity-30 font-fujiwara-regular text-black text-lg">
                  2024
                </p>
              </div>
              <div className="">
                {/* Image principale */}
                <div className="sp-img">
                  <img
                    src={project.imagePreview}
                    alt={`${project.name} - Image principale`}
                  />
                </div>
                {/* Key images dynamiques */}
                {project.keyImages &&
                  project.keyImages.map((img, idx) => (
                    <div className="sp-img" key={idx}>
                      <img
                        src={img}
                        alt={`${project.name} - Image ${idx + 1}`}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectPage;
