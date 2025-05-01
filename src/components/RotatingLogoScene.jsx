import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import { Model } from "./Model";
import { Environment } from "@react-three/drei";
import { useMotionValueEvent, useScroll, useTransform } from "motion/react";

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
  return (
    <div className="w-[100vw] h-[250vh]" style={{ backgroundColor: bgColor }}>
      <Canvas>
        <Model />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default RotatingLogoScene;
