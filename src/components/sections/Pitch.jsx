import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import React from "react";
import ParagraphAnimation from "../textAnimations/ParagraphAnimation";
import LettersTextAnimation from "../textAnimations/LettersTextAnimation";

gsap.registerPlugin(ScrollTrigger);

export const Pitch = () => {
  return (
    <div
      id="pitch"
      className="relative h-[250vh] w-auto flex flex-col mix-blend-difference"
    >
      <div
        id="pitchFirstPart"
        className="relative h-screen w-screen font-fujiwara-black-italic"
      >
        <div className="absolute h-4/5 bottom-0 flex flex-col justify-between gap-12 py-12">
          <div className="relative flex justify-center w-2/3 sm:w-1/2 left-5 row-start-2 row-end-3 text-[clamp(0.8rem,11vw,14rem)]/[9vw] sm:text-6xl lg:text-7xl xl:text-8xl">
            <h1 className="w-auto px-5 sm:px-12 lg:px-24 xl:px-32">
              La vie est faite de moments de lumière...
            </h1>
          </div>
          <div className="w-full row-start-4 flex justify-center items-center ">
            <h1 className="w-full sm:w-128 px-8 text-center text-[clamp(0.6rem,2vw,4rem)]/4 sm:text-sm/5 md:text-base/5 ">
              Joie, peur, amour, tension... Autant de sentiments universels qui
              nous traversent et nous unissent.
            </h1>
          </div>
        </div>
      </div>

      <div
        id="pitchSecondPart"
        className="relative top-[50vh] flex flex-col gap-10 lg:gap-16 justify-between left-0 w-screen h-screen py-18 px-8 lg:px-20 lg:py-32 font-fujiwara-black-italic"
      >
        <div className="w-full flex flex-col md:flex-row gap-16 sm:gap-8 md:gap-0 justify-between">
          <h1 className="font-fujiwara-black-italic text-[clamp(1.6rem,12vw,11rem)] md:text-7xl 2xl:text-8xl leading-none whitespace-nowrap ">
            et d'obscurité.
          </h1>
          <h1 className="w-2/3 md:hidden lg:block lg:w-1/5 text-xs xl:text-sm/5 2xl:text-base/5 self-end md:self-auto lg:opacity-40">
            {" "}
            “Clair Obscur est une agence de production audiovisuelle dédiée à
            capturer et retransmettre à travers l'image toute la puissance des
            émotions.”
          </h1>
        </div>
        {/* PARTIE BASSE */}
        <div className="flex w-full justify-between text-xs xl:text-sm/5 2xl:text-base/5 gap-2">
          {/* PARITE GAUCHE */}
          <div className="w-2/3 lg:w-2/5 flex flex-col gap-8">
            {" "}
            <h1 className="hidden lg:block w-full ">
              {" "}
              “Clair Obscur est une agence de production audiovisuelle dédiée à
              capturer et retransmettre à travers l'image toute la puissance des
              émotions.”
            </h1>
            <h1 className="w-full">
              {" "}
              “Clair Obscur est une agence de production audiovisuelle dédiée à
              capturer et retransmettre à travers l'image toute la puissance des
              émotions.”
            </h1>
          </div>
          {/* PARTIE DROITE */}
          <div className="w-1/3 lg:w-2/5 flex flex-col gap-8">
            {" "}
            <h1 className="hidden lg:block w-full self-end">
              {" "}
              “Clair Obscur est une agence de production audiovisuelle dédiée à
              capturer et retransmettre à travers l'image toute la puissance des
              émotions.”
            </h1>
            <h1 className="hidden lg:block lg:w-1/3 opacity-40">
              {" "}
              “Clair Obscur est une agence de production audiovisuelle dédiée à
              capturer et retransmettre à travers l'image toute la puissance des
              émotions.”
            </h1>
            {/* PARAGRAPHE POUR PETIT ECRAN */}
            <h1 className="lg:hidden lg:w-1/3 opacity-40">
              {" "}
              “Clair Obscur est une agence de production audiovisuelle dédiée à
              capturer
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pitch;
