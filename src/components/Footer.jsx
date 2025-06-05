import React from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./Model";
import { Environment } from "@react-three/drei";

const Footer = () => {
  return (
    <div className="relative h-screen w-screen z-50 bg-gray-800">
      <Canvas>
        <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/1k/studio_small_03_1k.exr" />
        <directionalLight
          color="white"
          position={[-15, 1, -5]}
          intensity={7.5}
        />
        <Model
          position={[0, 0, 0]}
          rotation={[4.5, 0.6, 2.3]}
          scale={[40, 40, 40]}
        />
      </Canvas>
    </div>
  );
};

export default Footer;
