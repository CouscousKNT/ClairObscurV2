import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import React from "react";

gsap.registerPlugin(ScrollTrigger);

export const Pitch = () => {
  const pitch = document.querySelectorAll(".pitch");
  console.log(pitch);

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
          markers: { startColor: "#dfdcff", endColor: "transparent" },
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
    <div className="z-10 absolute h-[100vh] p-8 flex flex-col gap-12 justify-between top-[250vh] text-black">
      <div className="flex flex-col gap-4 w-auto">
        {/* <h1 className="text-[15vw] font-fujiwara">et d'obscurité.</h1> */}
      </div>
      <div className="font-fujiwara">
        <h2 className="pitch w-3/4 text-xl md:w-4/5 md:text-4xl font-fujiwara">
          Joie, tristesse, colère... ces instants qui nous entourent façonnent
          nos plus beau souvenirs.
        </h2>
      </div>
      <div>
        <p className="bottom-0 text-xs md:text-base ">
          Clair Obscur est une agence de production audiovisuelle dédiée à
          capturer et retransmettre à travers l'image toute la puissance des
          émotions.
        </p>
      </div>
    </div>
  );
};

export default Pitch;
