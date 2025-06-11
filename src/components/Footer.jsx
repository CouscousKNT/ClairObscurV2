import React from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./Model";
import { Environment } from "@react-three/drei";

const Footer = () => {
  return (
    <div className="relative grid grid-cols-1 grid-rows-5 h-screen w-screen z-40 bg-black">
      <div className="row-span-2 grid grid-cols-10 border-b-1 border-white/20 ">
        <div className="col-span-1 border-r-1 border-white/20"></div>
        <div className="col-span-1 border-r-1 border-white/20"></div>
        <div className="col-span-3 border-r-1 border-white/20"> </div>
        <div className="col-span-5">
          <div className="absolute object-cover w-[50vw] h-auto">
            <img className="" src={"/logo/logo.svg"} alt="" />
          </div>
        </div>
      </div>
      <div className="row-span-3 row-start-3 grid grid-cols-10 border-b-1 border-white/20">
        <div className="col-span-1 border-r-1 border-white/20"></div>
        <div className="col-span-1 border-r-1 border-white/20"></div>
        <div className="font-fujiwara-black col-span-3 flex flex-col gap-8 border-r-1 border-white/20">
          <span>[ Instagram ]</span>
          <span>[ Linkedin ]</span>
          <span className="text-2xl">agenceclairobscur@gmail.com</span>
        </div>
        <div className="col-span-5">
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
              position={[0, 0, 0]}
              rotation={[4.5, 0.7, 2.3]}
              scale={50}
              enableRotatingEffect={true}
            />
          </Canvas>
        </div>
      </div>
      <div className="h-[3vh]"></div>
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
