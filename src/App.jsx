import "./App.css";
import { Header } from "./components/Header";
import { Gallery } from "./components/Gallery";
import { Footer } from "./components/Footer";
import { LandingPage } from "./components/sections/LandingPage";
import { RotatingLogoScene } from "./components/sections/RotatingLogoScene";
import { ProjectSection1 } from "./components/sections/ProjectSection1";
import { ProjectSection2 } from "./components/sections/ProjectSection2";
import { MemberSection } from "./components/sections/MemberSection";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <LandingPage />
      <RotatingLogoScene />
      <Gallery />
      <ProjectSection1 />
      <ProjectSection2 />
      <MemberSection />
      <Footer />
    </>
  );
}

export default App;
