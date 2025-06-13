import React from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./Model";
import { Environment } from "@react-three/drei";

const Footer = () => {
  return (
    <div className="relative h-screen w-screen z-40 bg-black md:grid md:grid-cols-1 md:grid-rows-5">
      <div className="font-fujiwara-black pt-20 flex flex-col gap-4 border-b-1 border-white/20 md:gap-0 md:pt-0 md:row-span-2 md:grid md:grid-cols-10">
        <div className="col-span-1 flex justify-center items-end border-r-1 border-white/20 md:justify-start">
          <span className="text-xl xl:text-xl ml-2 md:ml-0">[ Instagram ]</span>
        </div>
        <div className="col-span-1 flex justify-center items-end border-r-1 border-white/20 md:justify-start">
          <span className="text-xl xl:text-xl ml-2 md:ml-0">[ Linkedin ]</span>
        </div>
        <div className="col-span-3 flex justify-center items-end border-r-1 border-white/20 md:justify-start">
          <span className="md:text-xl md:pb-0 md:ml-0 xl:text-2xl pb-8 ml-2">
            agenceclairobscur@gmail.com
          </span>{" "}
        </div>
        <div className="hidden md:w-full md:h-full md:col-span-5 md:flex md:items-center">
          <div className="absolute object-cover w-[30%] h-auto">
            <img className="" src={"/logo/logo.svg"} alt="" />
          </div>
        </div>
      </div>
      <div className="row-span-3 row-start-3 border-b-1 border-white/20 md:grid md:grid-cols-10">
        <div className="col-span-1 border-r-1 border-white/20"></div>
        <div className="col-span-1 border-r-1 border-white/20">
          {/* <p className="font-fujiwara absolute w-[30%]">
            ClairObscur sait comment captiver son audience, transformons cette
            idée que vous avez en tête en quelque chose de concret, écrivez nous
            !{" "}
          </p> */}
        </div>
        <div className="font-fujiwara-black col-span-3 flex flex-col gap-8 border-r-1 border-white/20"></div>
        <div className="col-span-5 h-[55vh] w-full">
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
      </div>
      <div className="font-fujiwara-black flex flex-row justify-center pt-4 md:h-[3vh] md:pt-0 md:grid md:grid-cols-10">
        <div className="col-span-1 h-full flex items-end md:border-r-1 border-white/20 md:ml-2">
          ClairObscur©
        </div>
        <div className="col-span-1 h-full flex items-end md:border-r-1 border-white/20 md:ml-2">
          2025
        </div>
        <div className="hidden absolute col-span-3 flex items-end md:border-r-1 border-white/20"></div>
        <div className="hidden absolute col-span-5 flex items-center"></div>
      </div>
      {/* <div className="absolute z-10">
        <div className="object-cover bottom-0 h-auto w-[90vw] m-4 ">
          <img className="" src={"/logo/logo.svg"} alt="" />
        </div>
        <div className="font-fujiwara mix-blend-difference w-full flex flex-row justify-center gap-2 z-50">
          <div>
            <a href="#">agenceclairobscur@gmail.com</a>
          </div>
          <div>
            <a href="#">[ Instagram ]</a>
          </div>
          <div>
            <a href="#member1">[ Linkedin ]</a>
          </div>
        </div>
      </div>
      <div className="w-screen h-[90vh] top-0 z-5 ">
        <Canvas className="">
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
            position={[0, -3, 0]}
            rotation={[4.5, 0.7, 2.3]}
            scale={10}
            enableRotatingEffect={false}
          />
        </Canvas>
      </div> */}
    </div>
  );
};

export default Footer;
