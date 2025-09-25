import React from "react";
import { Project, projectsList } from "../../projectsList";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

// Interface pour les props du composant
interface GalerieProps {
  project: Project;
}

const Galerie: React.FC<GalerieProps> = ({ project }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <div className="flex p-6">
        {/* Work sidebar - spacer */}
        <div className="flex-1"></div>

        {/* Work main content */}
        <div className="flex-[3] my-[17.5vh] mb-[5vh]">
          {projectsList.map((yearData, yearIndex) => (
            <div key={yearIndex} className="mb-30">
              {/* Year title */}
              <div className="relative">
                <h1
                  className="
                  relative top-32 -left-28 transform translate-y-0 z-10 text-6xl font-bold
                  max-lg:top-0 max-lg:left-0 max-lg:mb-6
                "
                >
                  '{yearData.year}
                </h1>
              </div>

              {/* Projects grid */}
              <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
                {yearData.projects.map((project, projectIndex) => (
                  <div
                    key={projectIndex}
                    className="flex flex-col mb-2 cursor-pointer"
                    onClick={() => navigate(project.projectUrl)}
                  >
                    {/* Project image */}
                    <div className="aspect-[5/3] overflow-hidden mb-3">
                      <img
                        src={project.imagePreview}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Project info */}
                    <div className="flex flex-col gap-1">
                      <p className="font-fujiwara-black-italic text-sm">
                        {project.name}
                      </p>
                      <p className="font-fujiwara text-sm capitalize text-foreground-200">
                        {project.brand}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Galerie;
