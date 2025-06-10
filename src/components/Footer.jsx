import React from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./Model";
import { Environment } from "@react-three/drei";

const Footer = () => {
  return (
    <div className="relative h-screen w-screen z-50 bg-gray-800">
      <Canvas>
        <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/1k/studio_small_03_1k.exr" />
        <directionalLight color="white" position={[0, 0, 0]} intensity={70.5} />
        <ambientLight intensity={0.5} />
        <directionalLight
          color="white"
          position={[-5, 0, -5]}
          intensity={70.5}
        />
        <directionalLight color="white" position={[0, 1, 0]} intensity={70.5} />
        <Model
          position={[0, -1, 0]}
          rotation={[4.5, 0.7, 2.3]}
          scale={[50, 50, 50]}
          enableRotatingEffect={true}
        />
      </Canvas>
    </div>
  );
};

export default Footer;
