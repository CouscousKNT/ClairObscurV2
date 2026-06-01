import { getAllProjects } from "../projectsList";
import Header from "../components/Header";
import LandingPage from "../components/sections/LandingPage";
import RotatingLogoScene from "../components/sections/RotatingLogoScene";
import OfferSection from "../components/sections/OfferSection";
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
    <main className="relative w-full h-full">
      <Header />
      <LandingPage />
      <RotatingLogoScene />

      <OfferSection />
      <div id="projects" className="relative top-0">
        <div className="z-50 absolute w-full h-56 top-0 bg-black backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)] pointer-events-none"></div>

        {/* Map sur tous les projets */}
        {projects.map((project, index) => (
          <ProjectSection key={`${project.name}-${index}`} project={project} />
        ))}
      </div>
      <FooterV2 />
    </main>
  );
}

export default Home;
