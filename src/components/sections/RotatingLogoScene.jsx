"use client";

import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { Model } from "../3d/Model";
import { Environment } from "@react-three/drei";
import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { CustomText } from "../3d/CustomText";
import { useWindowSize } from "../../utils/useWindowSize";
import FluidGradientCanvas from "../FluidGradientCanvas/FluidGradientCanvas";
import Pitch from "./Pitch";

export const RotatingLogoScene = () => {
  const { scrollYProgress } = useScroll();

  // Transformation de la couleur (blanc vers noir) en fonction de la Scrollbar

  // REMPLACER XX , XX PAR LE POURCENTAGE DE DEBUT ET DE FIN
  // DE LA PROGRESSION DU SCROLLPROGRESS (ENTRE 0 ET 1)
  //(scrollYProgress, [XX, XX], ["#111111", "#ffe6e9"]);
  const background = useTransform(
    scrollYProgress,
    [0.29, 0.329],
    ["#000000", "#ffe6e9"],
  );
  console.log(scrollYProgress);

  // On stocke la couleur actuelle dans du state pour l’appliquer dans du style inline
  const [bgColor, setBgColor] = useState("#000000");
  useMotionValueEvent(background, "change", (latest) => {
    setBgColor(latest);
  });
  console.log(scrollYProgress);

  //Hauteur et Largeur de l'écran.
  const { width, height } = useWindowSize();

  return (
    <div
      id="pitchSection"
      className="w-full h-[250vh]"
      style={{ backgroundColor: bgColor }}
    >
      {/* <div>
        <p>Largeur : {width}px</p>
        <p>Hauteur : {height}px</p>
      </div> */}
      <div className="absolute w-full h-[250vh] ">
        <Canvas gl={{ antialias: false, preserveDrawingBuffer: false }}>
          <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/1k/studio_small_03_1k.exr" />
          {/* <fog color="#000000" attach="fog" near={3} far={2} /> */}
          <ambientLight intensity={0.5} />
          <directionalLight
            color="white"
            position={[-15, 0, -5]}
            intensity={7.5}
          />
          <directionalLight
            color="white"
            position={[0.5, -7.5, 2.5]}
            intensity={7.5}
          />
          <Model
            position={[0, 2, 0]}
            rotation={[0, -0.65, 0.5]}
            enableFloatingEffect={false}
            enableRotatingEffect={false}
            enableScrollEffect={true}
          />
        </Canvas>
      </div>
      <Pitch />
    </div>
  );
};

export default RotatingLogoScene;
