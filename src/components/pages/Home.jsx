import React from "react";
import LandingPage from "../sections/LandingPage";
import RotatingLogoScene from "../sections/RotatingLogoScene";
import ProjectSection1 from "../sections/ProjectSection1";
import ProjectSection2 from "../sections/ProjectSection2";
import Footer from "../Footer";

export function Home() {
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
