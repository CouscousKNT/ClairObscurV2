import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import React, { useState } from "react";
import ParagraphAnimation from "../textAnimations/ParagraphAnimation";
import LettersTextAnimation from "../textAnimations/LettersTextAnimation";
// N'oubliez pas d'importer votre composant Form
import Form from "../../pages/Contact/Form";

gsap.registerPlugin(ScrollTrigger);

export const Pitch = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      {/* 
        1. OVERLAY DU FORMULAIRE 
        Placé en dehors du "mix-blend-difference" pour garder ses vraies couleurs 
      */}
      <div
        className={`fixed inset-0 z-[50] ${
          isFormOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${
            isFormOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsFormOpen(false)}
        />

        <section
          className={`absolute top-0 right-0 h-full w-full lg:w-1/3 bg-[#101010] shadow-2xl transition-transform duration-500 ease-in-out ${
            isFormOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="relative h-full w-full overflow-y-auto pt-20 px-6">
            <Form onClose={() => setIsFormOpen(false)} />
          </div>
        </section>
      </div>

      {/* 2. LE CONTENU PRINCIPAL DE PITCH */}
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
                Joie, peur, amour, tension... Autant de sentiments universels
                qui nous traversent et nous unissent.
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
            <h1 className="w-2/3 md:hidden lg:block lg:w-1/5 text-xs xl:text-sm/5 2xl:text-base/5 self-end md:self-auto opacity-40">
              "Votre marque a une voix, nous lui donnons sa plus belle image.
              Avec justesse et passion, nous sublimons votre histoire."
            </h1>
          </div>

          <div className="flex w-full justify-between text-xs xl:text-sm/5 2xl:text-base/5 gap-2">
            <div className="w-2/3 md:w-2/5 flex flex-col gap-8">
              <h1 className="hidden md:block w-full ">
                1 - Nous prenons le temps de nous imprégner de l'ADN de votre
                marque et de vos ambitions pour définir un angle narratif
                unique.
              </h1>
              <h1 className="w-full hidden md:block">
                2 - Sur le terrain, notre équipe allie rigueur technique et
                regard sensible pour capturer l'essence de votre activité. Notre
                œil capte les détails et les contrastes qui feront vibrer votre
                image.
              </h1>
              <h1 className="w-full md:hidden">
                De la page blanche à la lumière, nous traduisons votre essence
                en un récit visuel unique. Nous capturons l'instant pour mieux
                le sculpter, révélant par le montage toute la poésie et la force
                de votre histoire.
              </h1>
            </div>

            <div className="w-1/3 md:w-2/5 flex flex-col gap-8">
              <h1 className="hidden md:block w-full self-end">
                3 - Nous travaillons chaque détail, chaque contraste et chaque
                note sonore. Nous assemblons ces fragments avec précision pour
                transformer vos rushs en une œuvre visuelle puissante.
              </h1>
              <h1 className="hidden md:block md:w-2/3 lg:w-1/3 opacity-40">
                "Clair Obscur sublime votre marque à travers un processus
                rigoureux : une écriture sur mesure, un tournage sensible et une
                post-production précise."
              </h1>

              {/* 
                3. BOUTON CORRIGÉ 
                Ajout de "relative z-50 cursor-pointer" pour forcer la priorité du clic
              */}
              <button
                onClick={() => setIsFormOpen(true)}
                className="relative z-50 cursor-pointer md:hidden bg-white text-black py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
              >
                Prendre rendez-vous
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pitch;
