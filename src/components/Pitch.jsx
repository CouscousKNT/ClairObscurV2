import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import React from "react";
import ParagraphAnimation from "./ParagraphAnimation";
import LettersTextAnimation from "./LettersTextAnimation";

gsap.registerPlugin(ScrollTrigger);

export const Pitch = () => {
  return (
    <div
      id="pitch"
      className="relative h-[250vh] p-8 flex flex-col gap-12 justify-between top-[0] mix-blend-difference"
    >
      <div
        id="obscuriteTrigger"
        className="absolute top-[150vh] left-0 w-screen "
      >
        {/* <h1 className="font-fujiwara-black-italic text-center text-[clamp(0.8rem,12vw,14rem)]">
        et d'obscurité.
      </h1> */}
        <LettersTextAnimation
          triggerStart={"#obscuriteTrigger"}
          triggerEnd={""}
          start={"top center"}
          end={""}
          stagger={0.09}
          duration={0.5}
          text={"et d'obscurité."}
          className={
            "font-fujiwara-black-italic text-center text-[clamp(0.8rem,12vw,14rem)]"
          }
        />
      </div>
      <div id="pitchTrigger" className="relative top-[195vh]">
        {" "}
        <ParagraphAnimation
          triggerStart={"#pitchTrigger"}
          triggerEnd={""}
          start={"bottom bottom"}
          end={""}
          stagger={0.15}
          duration={0.8}
          text={`
                    Joie, tristesse, colère... ces instants qui nous entourent façonnent
          nos plus beau souvenirs.
                    `}
          className={
            "lg:hidden w-3/4 text-xl md:w-4/5 md:text-4xl font-fujiwara"
          }
        />
        <ParagraphAnimation
          triggerStart={"#pitchTrigger"}
          triggerEnd={""}
          start={"bottom bottom"}
          end={""}
          stagger={0.3}
          duration={0.8}
          text={`
                    Joie, tristesse, colère... ces instants qui nous entourent façonnent
          nos plus beau souvenirs. Contemplez avec attention le tableau de la vie,
          c'est plus qu'une simple histoire de couleur.
                    `}
          className={"hidden lg:block lg:w-4/5 lg:text-4xl lg:font-fujiwara"}
        />
      </div>
      <div>
        <p className="bottom-0 text-xs md:text-base text-white">
          Clair Obscur est une agence de production audiovisuelle dédiée à
          capturer et retransmettre à travers l'image toute la puissance des
          émotions.
        </p>
      </div>
    </div>
  );
};

export default Pitch;
