import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./components/Model";
import "./App.css";
import { Environment } from "@react-three/drei";
import { HeroSection } from "./components/HeroSection";
import { RotatingLogoScene } from "./components/RotatingLogoScene";
import { Pitch } from "./components/Pitch";
import { Header } from "./components/Header";
import PitchIntroSection from "./components/PitchIntroSection";
import { Gallery } from "./components/Gallery";
import { Project1 } from "./components/Project1";
import ProjectSection1 from "./components/ProjectSection1";
import { ProjectSection2 } from "./components/ProjectSection2";
import { ScrollControls } from "@react-three/drei";

import Lenis from "lenis";

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
    </>
  );
}

export default App;
