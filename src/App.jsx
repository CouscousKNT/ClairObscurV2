import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import { useEffect, useRef } from "react";
import ProjectPage from "./pages/ProjectPage/ProjectPage";
import Credits from "./pages/Credits/Credits";
import Contact from "./pages/Contact/Contact";
import Lenis from "lenis";
import Galerie from "./pages/Galerie/Galerie";

function AppRoutes() {
  const lenisRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.11,
      wheelMultiplier: 1,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });

      setTimeout(() => {
        lenisRef.current.resize();
      }, 50);
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/galerie" element={<Galerie />} />
      <Route path="/credits" element={<Credits />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/:projectSlug" element={<ProjectPage />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
