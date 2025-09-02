import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/pages/Home";
import Moluki from "./components/pages/Moluki/Moluki";
import AuxCouleursDesTableaux from "./components/pages/AuxCouleursDesTableaux/AuxCouleursDesTableaux";
import Credits from "./components/pages/Credits/Credits";
import { Header } from "./components/Header";
import { Gallery } from "./components/Gallery";
import { Footer } from "./components/Footer";
import { LandingPage } from "./components/sections/LandingPage";
import { RotatingLogoScene } from "./components/sections/RotatingLogoScene";
import { ProjectSection1 } from "./components/sections/ProjectSection1";
import { ProjectSection2 } from "./components/sections/ProjectSection2";
import { MemberSection } from "./components/sections/MemberSection";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

function App() {
  const lenisRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      // Valeur entre 0 et 1
      // Plus la valeur est faible, plus le scroll sera fluide
      lerp: 0.05,
      // Plus la valeur est haute, plus le défilement sera rapide
      wheelMultiplier: 1,
    });
    lenisRef.current = lenis;
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      <BrowserRouter>
        {/* Menu de navigation */}
        {/* <nav className="flex gap-4 p-4 bg-gray-800 text-white">
          <Link to="/">Accueil</Link>
          <Link to="/moluki">Moluki</Link>
          <Link to="/aux-couleurs-des-tableaux">Aux Couleurs des Tableaux</Link>
          <Link to="/credits">Credits</Link>
        </nav> */}

        {/* Définition des routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/moluki" element={<Moluki />} />
          <Route
            path="/aux-couleurs-des-tableaux"
            element={<AuxCouleursDesTableaux />}
          />
          <Route path="/credits" element={<Credits />} />
        </Routes>
      </BrowserRouter>

      {/* <LandingPage /> */}
      {/* <RotatingLogoScene /> */}
      {/* <Gallery /> */}
      {/* <ProjectSection1 /> */}
      {/* <ProjectSection2 /> */}
      {/* <MemberSection /> */}
      {/* <Footer /> */}
      {/* <FluidGradientCanvas /> */}
    </>
  );
}

export default App;
