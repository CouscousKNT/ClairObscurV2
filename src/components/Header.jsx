import React, { useEffect, useState } from "react";
import logo from "/logo/itemBlanc.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // fermeture avec Échap
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // écoute les changements de route et scrolle si state.section existe
  useEffect(() => {
    if (location.state?.section) {
      const el = document.getElementById(location.state.section);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      // nettoyage du state pour éviter de rescroller à chaque navigation
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  return (
    <div>
      {/* NAVBAR */}
      <div className="fixed w-screen flex justify-between md:grid md:grid-cols-3 px-5 py-10 sm:px-10 sm:py-10 lg:px-20 lg:py-10 mix-blend-difference z-90">
        <div className="flex col-start-2 justify-center h-auto md:w-full">
          <button
            className="cursor-pointer w-8 lg:w-12"
            onClick={() => {
              setOpen(false);
              if (location.pathname === "/") {
                const el = document.getElementById("hero");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              } else {
                navigate("/", { state: { section: "hero" } });
              }
            }}
          >
            <img src={logo} alt="logo" />
          </button>
        </div>

        <div className="font-fujiwara-black-italic col-start-3 flex justify-end text-lg sm:text-xl lg:text-3xl w-auto z-[100]">
          <button
            className="cursor-pointer"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="site-menu"
          >
            [MENU]
          </button>
        </div>
      </div>

      {/* MENU */}
      {open && (
        <div
          id="site-menu"
          className="fixed h-screen w-screen lg:right-0 lg:w-1/3 flex flex-col bg-white/30 backdrop-blur-lg z-100 font-fujiwara-black text-black/70 text-7xl"
        >
          <div className="w-full flex justify-end border-b border-black/10 px-5 py-10 sm:px-10 sm:py-10 lg:px-20 lg:py-10 text-5xl lg:text-5xl">
            <button className="cursor-pointer" onClick={() => setOpen(false)}>
              [X]
            </button>
          </div>
          <div className="flex flex-col w-full px-20 py-12 gap-2">
            {/* Pitch */}
            <button
              className="self-end cursor-pointer"
              onClick={() => {
                setOpen(false);
                if (location.pathname === "/") {
                  const el = document.getElementById("pitchSection");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                } else {
                  navigate("/", { state: { section: "pitchSection" } });
                }
              }}
            >
              Pitch
            </button>

            {/* Galerie */}
            <Link className="self-end" to="/galerie">
              <button
                className="self-end cursor-pointer"
                onClick={() => {
                  setOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Galerie
              </button>
            </Link>

            <Link className="self-end" to="/credits">
              <button
                className="self-end cursor-pointer"
                onClick={() => {
                  setOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Credits
              </button>
            </Link>

            {/* Contact */}
            <Link className="self-end" to="/contact">
              <button
                className="self-end cursor-pointer"
                onClick={() => {
                  setOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Contact
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
