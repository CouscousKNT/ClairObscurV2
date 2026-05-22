import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./3d/Model";
import { HeroGradient } from "./HeroGradient/HeroGradient";
import FluidGradientCanvas from "./FluidGradientCanvas/FluidGradientCanvas";
import { Environment } from "@react-three/drei";
import logo from "/logo/logo.svg";
import Form from "../pages/Contact/Form";

export const FooterV2 = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <div
      id="contact"
      className="absolute w-full h-auto z-90 bg-black font-fujiwara-bold flex flex-col "
    >
      <div className="font-fujiwara-black bg-black relative bottom-0 flex justify-center text-xs border-b border-white/20 z-20">
        <span className="p-3 z-50"> ^ </span>
      </div>
      <div className="relative flex items-center px-8 py-4">
        <img
          src={logo}
          alt="Clair Obscur"
          className="h-16 md:h-20 lg:h-24 xl:h-28 w-auto object-contain"
        />
      </div>
      {/* RESEAUX SOCIAUX */}
      <div className="flex flex-col lg:flex-row ">
        <div className="lg:w-1/3 py-4 px-8 lg:py-12 text-sm xl:text-[1.05rem] font-fujiwara-black z-100">
          <div className="border-b border-white/10 py-[0.7rem] font-fujiwara-black-italic xl:text-4xl text-xl">
            RÉSEAUX SOCIAUX
          </div>
          <div className="border-b border-white/10 py-[0.4rem] px-5">
            <a
              className="flex"
              href="https://www.instagram.com/agenceclairobscur?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            >
              [ <img src="/logo/logoInstagram.svg" className="w-5" alt="" /> ] -
              @agenceclairobscur
            </a>
          </div>
          <div className="border-b-1 border-white/10 py-[0.4rem] px-5">
            <a
              className="flex"
              href="https://www.tiktok.com/@agenceclairobscur"
            >
              [ <img src="/logo/logoTiktok.svg" className="w-5" alt="" /> ] -
              @agenceclairobscur
            </a>
          </div>
          <div className="border-b-1 border-white/10 py-[0.4rem] px-5">
            <a
              className="flex"
              href="https://www.linkedin.com/company/clair-obscur-vision/"
            >
              [ <img src="/logo/logoLinkedIn.svg" className="w-5" alt="" /> ] -
              agenceclairobscur
            </a>
          </div>
        </div>

        {/* MAIL  */}
        <div className="lg:w-1/3 py-4 px-8 lg:py-12 xl:text-lg font-fujiwara-black z-100">
          <div className="border-b border-white/10 py-[0.7rem] font-fujiwara-black-italic xl:text-4xl text-xl">
            MAIL
          </div>
          <div className="flex flex-col gap-4">
            <div className="border-b-1 text-sm sm:text-lg xl:text-xl border-white/10 py-[0.4rem] px-5 whitespace-nowrap">
              <button
                onClick={() => setIsFormOpen(true)}
                className="bg-white text-black py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
              >
                Par EMail
              </button>
            </div>
            <h1 className="hidden lg:block text-sm">
              Clair Obscur a une équipe dévouée et talentueuse. Clair Obscur
              sait comment captiver son audience. Transformons l'utopie en réel,
              écrivez nous.
            </h1>
          </div>
        </div>
        <div className="w-1/3 py-5 ">
          {/* <h1 className="py-[0.4rem] font-fujiwara-bold z-10">
            Clair Obscur a une équipe dévouée et talentueuse. Clair Obscur sait
            comment captiver son audience. Transformons l'utopie en réel,
            écrivez nous.
          </h1> */}
          <div className="absolute top-50 lg:top-0 w-full h-1/2 lg:w-1/3 lg:h-full top-0 ">
            <Canvas
              gl={{ antialias: false, preserveDrawingBuffer: false }}
              className="w-full h-full"
            >
              <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/1k/studio_small_03_1k.exr" />
              <directionalLight
                color="white"
                position={[0, 0, 0]}
                intensity={70.5}
              />
              <ambientLight intensity={0.5} />
              <directionalLight
                color="white"
                position={[-5, 0, -5]}
                intensity={70.5}
              />
              <directionalLight
                color="white"
                position={[0, 1, 0]}
                intensity={70.5}
              />
              <Model
                position={[0, 0.3, 0]}
                rotation={[4.5, 0.7, 2.3]}
                scale={50}
                enableRotatingEffect={true}
              />
            </Canvas>
          </div>
        </div>
      </div>
      <div className="font-fujiwara-black bg-black relative bottom-0 flex justify-center text-xs border-t border-white/20 z-20">
        <span className="p-3 z-50">Clair Obscur - 2026©</span>
      </div>
    </div>
  );
};

export default FooterV2;
