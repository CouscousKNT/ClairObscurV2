import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./components/Model";
import "./App.css";
import { Environment } from "@react-three/drei";
import { HeroSection } from "./components/HeroSection";
import { RotatingLogoScene } from "./components/RotatingLogoScene";
import { Pitch } from "./components/Pitch";
import { Header } from "./components/Header";
import PitchIntroSection from "./components/PitchIntroSection";
import Gallery from "./components/Gallery";

function App() {
  return (
    <>
      <Header />
      <HeroSection />
      <Pitch />
      <RotatingLogoScene />
      <Gallery />
      <HeroSection />
    </>
  );
}

export default App;
