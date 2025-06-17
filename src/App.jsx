import { Suspense, useEffect, useState } from "react";
import "./App.css";
import { RotatingLogoScene } from "./components/RotatingLogoScene";
import { Pitch } from "./components/Pitch";
import { Header } from "./components/Header";
import { Gallery } from "./components/Gallery";
import ProjectSection1 from "./components/ProjectSection1";
import { ProjectSection2 } from "./components/ProjectSection2";
import MemberSection from "./components/MemberSection";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import Lenis from "lenis";

function App() {
  return (
    <>
      <Header />
      <LandingPage />
      <Pitch />
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
