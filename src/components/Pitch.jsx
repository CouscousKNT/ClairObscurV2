import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import React from "react";

gsap.registerPlugin(ScrollTrigger);

export const Pitch = () => {
  const pitch = document.querySelectorAll(".pitch");

  function setupSplits() {
    pitch.forEach((desc) => {
      // Reset if needed
      if (desc.anim) {
        desc.anim.progress(1).kill();
        desc.split.revert();
      }

      desc.split = SplitText.create(desc, {
        type: "lines, lines",
        mask: "lines",
        linesClass: "line",
      });

      // Set up the anim
      desc.anim = gsap.from(desc.split.lines, {
        scrollTrigger: {
          trigger: desc,
          toggleActions: "play reverse play reverse",
          start: "top center",
        },
        duration: 0.8,
        ease: "circ.out",
        y: 80,
        stagger: 0.08,
      });
    });
  }

  ScrollTrigger.addEventListener("refresh", setupSplits);
  setupSplits();
  return (
    <div
      id="pitch"
      className="z-10 absolute h-screen p-8 flex flex-col gap-12 justify-between top-[250vh] mix-blend-difference"
    >
      <div className="flex flex-col gap-4 w-auto">
        {/* <h1 className="text-[15vw] font-fujiwara">et d'obscurité.</h1> */}
      </div>
      <div className="font-fujiwara-bold text-white ">
        <p className="pitch lg:hidden w-3/4 text-xl md:w-4/5 md:text-4xl font-fujiwara">
          Joie, tristesse, colère... ces instants qui nous entourent façonnent
          nos plus beau souvenirs.
        </p>
        <p className="pitch hidden lg:block lg:w-4/5 lg:text-4xl lg:font-fujiwara">
          Joie, tristesse, colère... ces instants qui nous entourent façonnent
          nos plus beau souvenirs. Regardez attentivement le tableau de la vie,
          c'est plus qu'une simple histoire de couleur
        </p>
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
