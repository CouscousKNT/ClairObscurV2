import React from "react";
import LandingPage from "../sections/LandingPage";
import RotatingLogoScene from "../sections/RotatingLogoScene";
import ProjectSection1 from "../sections/ProjectSection1";
import ProjectSection2 from "../sections/ProjectSection2";
import Footer from "../Footer";
import { useLocation } from "react-router-dom";

export function Home() {
  const location = useLocation();

  // useEffect(() => {
  //   // Reset scroll position
  //   window.scrollTo(0, 0);
  //   // Refresh Lenis if available
  //   if (window.lenis && typeof window.lenis.resize === "function") {
  //     window.lenis.resize();
  //     if (typeof window.lenis.scrollTo === "function") {
  //       window.lenis.scrollTo(0, { immediate: true });
  //     }
  //   }
  // }, [location.pathname]);
  return (
    <>
      <LandingPage />
      <RotatingLogoScene />
      <ProjectSection2 />
      <ProjectSection1 />
      <Footer />
    </>
  );
}

export default Home;
