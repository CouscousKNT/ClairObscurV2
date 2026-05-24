import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import FluidGradientCanvas from "../../components/FluidGradientCanvas/FluidGradientCanvas";
import logo from "/logo/logo.svg";
import ContactBG from "/images/contact-background.webp";
import Form from "./Form";

const Contact = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now
        .toLocaleTimeString("fr-FR", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
        .replace(/:/g, ":")
        .toUpperCase();
      setCurrentTime(timeString);
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden flex flex-col lg:flex-row">
      <Header />
      {/* Section réseau socieux + contact */}
      <section className="relative flex-1 h-full contact-page z-10 font-fujiwara-bold text-2xl transition-all duration-500">
        <div className="contact-copy absolute top-0 left-0 w-full h-full flex flex-col gap-[2rem] justify-center items-center">
          <div className="flex items-center justify-center flex-col gap-4">
            <img
              src={logo}
              alt="Clair Obscur"
              className="h-12 lg:h-16 xl:h-20 w-auto object-contain"
            />
            <h4 className="text-sm lg:text-base uppercase">Basé à Paris</h4>
          </div>

          <div className="flex items-center justify-center flex-col gap-2">
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-white text-black py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
            >
              Par EMail
            </button>
            <h4 className="flex gap-2">
              {" "}
              <a
                href="https://www.instagram.com/agenceclairobscur?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Instagram
              </a>
              <span>/</span>
              <a
                href="https://www.tiktok.com/@agenceclairobscur"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Tiktok
              </a>
              <span>/</span>
              <a
                href="https://www.linkedin.com/company/clair-obscur-vision/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                LinkedIn
              </a>
            </h4>
          </div>
        </div>
      </section>
      {/* Formulaire de contact */}
      <section
        className={`
          absolute lg:relative top-0 right-0 h-full z-50 bg-[#101010] shadow-2xl 
          transition-all duration-500 ease-in-out overflow-hidden
          ${
            isFormOpen
              ? "translate-x-0 w-full lg:w-1/3"
              : "translate-x-full w-full lg:translate-x-0 lg:w-0"
          }
        `}
      >
        <div className="relative w-full lg:w-[33.33vw] h-full">
          <div className="relative h-full w-full overflow-y-auto pt-20 px-6">
            <Form onClose={() => setIsFormOpen(false)} />
          </div>
        </div>
      </section>
      {/* Footer / Heure */}
      <div className="absolute z-10 w-full flex justify-between items-end p-1 gap-[2rem] text-sm md:text-base font-fujiwara-black px-5 py-5 sm:px-10 lg:px-20 bottom-0 pointer-events-none">
        <div>
          <p className="sm caps mono">{currentTime}</p>
        </div>
        <div>
          <p>&copy;Clair Obscur - 2026</p>
        </div>
      </div>
      {/* Background dégradé animé */}
      <div className="absolute w-full h-screen inset-0 z-0">
        {/* <FluidGradientCanvas /> */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center opacity-80 blur-sm scale-105"
        >
          <source src="/videos/contact_bg.mp4" type="video/mp4" />
          <img
            src={ContactBG}
            alt="Fallback background"
            className="w-full h-full object-cover"
          />
        </video>
      </div>
    </div>
  );
};

export default Contact;
