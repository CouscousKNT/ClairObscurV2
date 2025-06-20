import React from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./3d/Model";
import { Environment } from "@react-three/drei";
import logo from "/logo/logo.svg";

const Footer = () => {
  return (
    <div
      id="contact"
      className="relative flex flex-col  w-screen bg-black z-10"
    >
      <div className="absolute col-span-5 h-full w-full ">
        <Canvas className="w-full h-full">
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
            position={[0, 0, 0]}
            rotation={[4.5, 0.7, 2.3]}
            scale={50}
            enableRotatingEffect={true}
          />
        </Canvas>
      </div>
      <div className="relative bg-black flex flex-row items-center border-b-1 border-white/10 p-2">
        <img
          style={{ height: "30px", width: "auto", objectFit: "cover" }}
          src={logo}
          alt=""
        />
      </div>
      <div className="z-20 mix-blend-difference">
        <div className="font-fujiwara-black  flex flex-row justify-around pt-4">
          <a
            className="text-sm"
            href="https://www.instagram.com/agenceclairobscur?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          >
            [ INSTAGRAM ]
          </a>
          <a
            className="text-sm"
            href="https://www.linkedin.com/company/clair-obscur-vision/"
          >
            [ LINKIND ]
          </a>
        </div>
      </div>

      <div className="relative mix-blend-difference h-auto text-justify m-12 xl:mr-48 xl:ml-48 z-20">
        <p className="font-fujiwara text-[clamp(0.1rem,4vw,4rem)] lg:text-[clamp(0.8rem,3vw,4rem)]">
          Clair Obscur a une équipe dévouée et talentueuse. Clair Obscur sait
          comment captiver son audience. Transformons l'utopie en réel, écrivez
          nous.
        </p>
        <h1 className="font-fujiwara-black-italic text-center pt-8 text-[clamp(0.8rem,5vw,4rem)] lg:text-[clamp(0.8rem,2vw,4rem)] ">
          agenceclairobscur@gmail.com
        </h1>
      </div>
      <div className="font-fujiwara-black bg-black flex justify-center text-xs relative border-t-1 border-white/10 z-20">
        <span className="p-4 z-50">ClairObscur - 2025©</span>
      </div>
    </div>
  );
};

export default Footer;
