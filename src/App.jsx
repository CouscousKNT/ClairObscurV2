import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./components/Model";
import "./App.css";
import { Environment } from "@react-three/drei";
import { HeroSection } from "./components/HeroSection";
import { RotatingLogoScene } from "./components/RotatingLogoScene";
import { Pitch } from "./components/Pitch";

function App() {
  return (
    <>
      <HeroSection />
      <RotatingLogoScene />
      <HeroSection />
    </>
  );
}

export default App;
