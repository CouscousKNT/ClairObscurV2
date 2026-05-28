import { getAllProjects } from "../projectsList";
import Header from "../components/Header";
import LandingPage from "../components/sections/LandingPage";
import RotatingLogoScene from "../components/sections/RotatingLogoScene";
import ProjectSection from "../components/sections/ProjectSection";
import FooterV2 from "../components/FooterV2";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/all";

export function Home() {
  const projects = getAllProjects();
  useEffect(() => {
    ScrollTrigger.refresh();

    // Parfois utile de le refaire après 500ms le temps que les vidéos s'affichent
    const timeout = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => clearTimeout(timeout);
  }, []);

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
