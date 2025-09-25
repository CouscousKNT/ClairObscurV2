import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import React from "react";
import ParagraphAnimation from "../textAnimations/ParagraphAnimation";
import LettersTextAnimation from "../textAnimations/LettersTextAnimation";

gsap.registerPlugin(ScrollTrigger);

export const Pitch2 = () => {
  return (
    <div
      id="pitch"
      className="relative top-0 p-8 flex flex-col items-center gap-12 justify-between top-[0] mix-blend-difference"
    >
      <div id="pitchPar">
        <ParagraphAnimation
          triggerStart={"#pitchPar"}
          triggerEnd={""}
          start={"top center"}
          end={""}
          stagger={0.04}
          duration={0.8}
          text={`
      
                      Clair Obscur est une agence de production audiovisuelle dédiée à capturer et retransmettre à travers l'image toute la puissance des émotions.
                    `}
          className={
            "pt-5 font-fujiwara-light-italic text-white lg:w-1/2 lg:text-center lg:pt-16 text-xl xl:text-3xl/12 text-white"
          }
        />
      </div>
    </div>
  );
};

export default Pitch2;
