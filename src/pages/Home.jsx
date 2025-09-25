import { getAllProjects } from "../projectsList";
import Header from "../components/Header";
import LandingPage from "../components/sections/LandingPage";
import RotatingLogoScene from "../components/sections/RotatingLogoScene";
import ProjectSection from "../components/sections/ProjectSection";
import FooterV2 from "../components/FooterV2";

export function Home() {
  // Récupérer tous les projets (vous pouvez aussi filtrer par année si besoin)
  const projects = getAllProjects();

  return (
    <>
      <Header />
      <LandingPage />
      <RotatingLogoScene />
      <div id="projects"></div>

      {/* Map sur tous les projets */}
      {projects.map((project, index) => (
        <ProjectSection key={`${project.name}-${index}`} project={project} />
      ))}
      <FooterV2 />
    </>
  );
}

export default Home;
