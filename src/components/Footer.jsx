import React from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./3d/Model";
import { HeroGradient } from "./HeroGradient/HeroGradient";
import FluidGradientCanvas from "./FluidGradientCanvas/FluidGradientCanvas";
import { Environment } from "@react-three/drei";
import logo from "/logo/logo.svg";

export const Footer = () => {
  return (
    <div id="contact" className="relative h-full w-full z-10">
      {/* Overlay UI */}
      <div className="absolute inset-0 z-50 flex flex-col h-full w-full justify-between ">
        <div className="flex flex-col h-auto ">
          <div className="relative flex flex-row items-center border-b border-white/10 p-2 ">
            <img
              style={{ height: "30px", width: "auto", objectFit: "cover" }}
              src={logo}
              alt="Clair Obscur"
            />
          </div>

          {/* <div className="font-fujiwara-light-italic w-[50%] text-center">
            <h1>Transformons l'utopie en réel, contactez-nous.</h1>
          </div> */}
        </div>

        <h1 className="font-fujiwara-black opacity-40 text-black text-center leading-none whitespace-nowrap text-[clamp(2rem,10vw,12rem)] relative z-50">
          CLAIR OBSCUR.
        </h1>

        <div className="z-50 ">
          {/* >>> mix-blend-difference SUR le h1 <<< */}

          <div className="z-20">
            <div
              className="font-fujiwara-black p-8 
                  grid grid-cols-2 gap-4 text-xs
                  md:flex md:flex-row md:justify-between"
            >
              <a href="https://www.instagram.com/agenceclairobscur">
                [ INSTAGRAM ]
              </a>
              <a href="https://www.linkedin.com/company/clair-obscur-vision/">
                [ LINKEDIN ]
              </a>
              <a href="https://www.tiktok.com/@agenceclairobscur">[ TIKTOK ]</a>
              {/* <a href="mailto:agenceclairobscur@gmail.com">
                [ AGENCECLAIROBSCUR@GMAIL.COM ]
              </a> */}
            </div>
          </div>

          <div className="font-fujiwara-black relative bottom-0 flex justify-center text-xs border-t border-white/10 z-20">
            <span className="p-4 z-50">2025©</span>
          </div>
        </div>
      </div>

      {/* Canvas en fond (backdrop pour le blend) */}
      <div className="absolute inset-0 z-0">
        <FluidGradientCanvas />
      </div>
    </div>
  );
};

export default Footer;
