"use client";

import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { Model } from "./Model";
import { Environment } from "@react-three/drei";
import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { CustomText } from "./CustomText";
import ManySphere from "./ManySphere";
import { useWindowSize } from "../utils/useWindowSize";

export const RotatingLogoScene = () => {
  const { scrollYProgress } = useScroll();

  // Transformation de la couleur (blanc vers noir) en fonction de la Scrollbar
  const background = useTransform(
    scrollYProgress,
    [0.5, 0.7],
    ["#111111", "#ffe6e9"]
  );

  // On stocke la couleur actuelle dans du state pour l’appliquer dans du style inline
  const [bgColor, setBgColor] = useState("#111111");
  useMotionValueEvent(background, "change", (latest) => {
    setBgColor(latest);
  });

  //Hauteur et Largeur de l'écran.
  const { width, height } = useWindowSize();

  let responsiveState = 1;
  let positionText1 = [0, 1.36, 0];
  let positionText2 = [0, 1, 0];
  let positionText3 = [0, 0.64, 0];
  let positionText4 = [0, -0.7, 2];

  if (width > height && width <= 640) {
    console.log("sm");
    positionText1 = [-1, 1.9, -0.5];
    positionText2 = [0.5, 1.2, -0.5];
    positionText3 = [0, 0.4, -0.5];
    positionText4 = [0, -0.4, 2];
  } else if (width > height && width <= 768) {
    console.log("md");
    positionText1 = [-1, 1.8, 0];
    positionText2 = [0.5, 1, 0];
    positionText3 = [0, 0.1, 0];
    positionText4 = [0, -0.4, 2];
  } else if (width > height && width <= 1024) {
    console.log("lg");
    positionText1 = [-1, 1.9, -0.5];
    positionText2 = [0.5, 1, -0.5];
    positionText3 = [0, 0.1, -0.5];
    positionText4 = [0, -0.55, 2];
  } else if (width > height && width <= 1280) {
    console.log("xl");
    positionText1 = [-1, 1.9, -0.5];
    positionText2 = [0.5, 1, -0.5];
    positionText3 = [0, 0.1, -0.5];
    positionText4 = [0, -0.55, 2];
  } else if (width > height && width > 1280) {
    console.log("2xl");
    positionText1 = [-1, 1.9, -0.5];
    positionText2 = [0.5, 1, -0.5];
    positionText3 = [0, 0.1, -0.5];
    positionText4 = [0, -0.65, 2];
  }
  console.log(width);

  return (
    <div className="w-full h-[250vh]" style={{ backgroundColor: bgColor }}>
      {/* <div>
        <p>Largeur : {width}px</p>
        <p>Hauteur : {height}px</p>
      </div> */}
      <Canvas>
        <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/1k/studio_small_03_1k.exr" />
        <fog color="#0f0f0f" attach="fog" near={3} far={2} />
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
        <CustomText text={`La vie est`} position={[0, 3.4, 0]} scale={6.3} />
        <CustomText text={`faite de`} position={positionText1} scale={6.3} />
        <CustomText text={`moments`} position={positionText2} scale={6.3} />
        <CustomText
          text={`de lumière...`}
          position={positionText3}
          scale={6.3}
        />
        {/* <CustomText
          text={`et d'obscurité.`}
          color="#111111"
          position={[-0.3, -1, -1]}
          scale={0.2}
        /> */}
        <CustomText
          text={`et d'obscurité.`}
          color="#111111"
          position={positionText4}
          scale={13}
          basic={true}
        />
        <Model />
        <ManySphere />
      </Canvas>
    </div>
  );
};

export default RotatingLogoScene;
