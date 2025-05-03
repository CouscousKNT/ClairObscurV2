import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import { Model } from "./Model";
import { Environment } from "@react-three/drei";
import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { CustomText } from "./CustomText";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

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
    <div className="w-full h-[250vh]" style={{ backgroundColor: bgColor }}>
      <Canvas>
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
        <CustomText text={`faite de`} position={[0, 1.36, 0]} scale={6.3} />
        <CustomText text={`moments`} position={[0, 1, 0]} scale={6.3} />
        <CustomText
          text={`de lumière...`}
          position={[0, 0.52, 0]}
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
          position={[0, -0.7, 2]}
          scale={13}
          basic={true}
        />
        <Model />
        <EffectComposer>
          {/* <Noise opacity={0.05} />
          <Vignette eskil={false} offset={0.1} darkness={0.7} />
          <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
            height={300}
            opacity={0.02}
          /> */}
          {/* <DepthOfField
            focusDistance={0.0068000000000000005}
            focalLength={0.01}
            bokehScale={10}
            height={480}
            // focusDistance={config.focusDistance} focalLength={config.focalLength} bokehScale={config.bokehScale}
          /> */}
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default RotatingLogoScene;
