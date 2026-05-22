("use client");
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import Header from "../../components/Header";
import { getAllProjects, type Project } from "../../projectsList";

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

      <section className="relative w-screen h-full lg:grid lg:grid-cols-3 pt-26 lg:pt-4 px-4">
        <div className="lg:sticky bg-white top-4 w-full lg:h-screen col-span-2 lg:pr-4">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src={`https://player.vimeo.com/video/${project.videoUrl}?h=abcd1234&title=0&byline=0&portrait=0&like=0&share=0&watchlater=0`}
              className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg"
              frameBorder="0"
              allow="fullscreen; picture-in-picture"
              allowFullScreen
              title={`Vidéo - ${project.name}`}
            ></iframe>
          </div>
          <div className="bg-white text-black grid grid-cols-3">
            <h1 className="font-fujiwara-black-italic text-xl">
              {project.name}
            </h1>
            {project.description && (
              <p className="w-full xl:mr-[1.5rem]">{project.description}</p>
            )}
            <br />
          </div>
        </div>
        <div className="w-full h-full col-span-1 ">
          <div className="">
            {project.keyImages &&
              project.keyImages.map((img, idx) => (
                <div className="mb-4 " key={idx}>
                  <img
                    className="rounded-2xl"
                    src={img}
                    alt={`${project.name} - Image ${idx + 1}`}
                  />
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectPage;
