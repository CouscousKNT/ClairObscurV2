import { useEffect, useState } from "react";
import { HeroSection } from "./components/HeroSection";
import { RotatingLogoScene } from "./components/RotatingLogoScene";
import { Pitch } from "./components/Pitch";
import { Header } from "./components/Header";
import { Gallery } from "./components/Gallery";
import { ProjectSection1 } from "./components/ProjectSection1";
import { ProjectSection2 } from "./components/ProjectSection2";
import { Members } from "./components/Members";
import MemberSection from "./components/MemberSection";
import Lenis from "lenis";
import "./App.css";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      // Valeur entre 0 et 1
      // Valeur par défaut : 0,1
      // Plus la valeur est faible, plus le scroll sera fluide
      lerp: 0.05,
      // Valeur par défaut : 1
      // Plus la valeur est haute, plus le défilement sera rapide
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
  return (
    <>
      <Header />
      <HeroSection />
      <Pitch />
      <RotatingLogoScene />
      <Gallery />

      <ProjectSection1 />
      {/* <Project1 /> */}
      <ProjectSection2 />
      <MemberSection />
    </>
  );
}

export default App;
