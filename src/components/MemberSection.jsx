import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useWindowSize } from "../utils/useWindowSize";
import { object } from "framer-motion/client";
import "../App.css";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import SplitType from "split-type";
import { SplitText } from "gsap/all";

export const MemberSection = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const { width, height } = useWindowSize();

  const imagesLinkBasedOnDevice =
    width <= 1024 ? `/team/membersAnimationMobile/` : `/team/membersAnimation/`;

  const horizontalScreen = width > height;
  console.log(height <= 1024 && horizontalScreen);

  const canvasResponsivity =
    width <= 1024 && !horizontalScreen
      ? {
          position: "absolute",
          width: "100vw",
          height: "auto",
          bottom: "0",
        }
      : height <= 1024 && horizontalScreen
      ? {
          position: "absolute",
          top: "0%", // colle le canvas en bas de la fenêtre
          right: "0%",
          width: "auto",
          height: "100vh",
        }
      : {
          position: "absolute",
          top: "0", // colle le canvas en bas de la fenêtre
          right: "0%",
          width: "auto",
          height: "100vh",
        };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const images = useMemo(() => {
    const loadedImages = [];
    for (let i = 1; i <= 311; i++) {
      const img = new Image();
      img.src = imagesLinkBasedOnDevice + `${i}.webp`;
      loadedImages.push(img);
    }
    return loadedImages;
  }, []);

  const render = useCallback(
    (index) => {
      if (images[index]) {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (context && images[index].complete) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(images[index], 0, 0, canvas.width, canvas.height);
        }
      }
    },
    [images]
  );

  const currentIndex = useTransform(scrollYProgress, [0, 1], [0, 312]);

  useMotionValueEvent(currentIndex, "change", (latest) => {
    render(Math.round(latest));
  });

  useEffect(() => {
    render(1); // commence avec la première image
  }, [render]);

  const quotes = document.querySelectorAll(".titleMember1");

  // function setupSplits() {
  //   quotes.forEach((quote) => {
  //     // Reset if needed
  //     if (quote.anim) {
  //       quote.anim.progress(1).kill();
  //       quote.split.revert();
  //     }

  //     quote.split = SplitText.create(quote, {
  //       type: "words,chars",
  //       linesClass: "split-line",
  //     });

  //     // Set up the anim
  //     quote.anim = gsap.from(quote.split.chars, {
  //       scrollTrigger: {
  //         trigger: quote,
  //         toggleActions: "restart pause resume reverse",
  //         start: "top 20%",
  //         markers: { startColor: "#dfdcff", endColor: "transparent" },
  //       },
  //       duration: 0.8,
  //       ease: "circ.out",
  //       y: 80,
  //       stagger: 0.04,
  //     });
  //   });
  // }

  // ScrollTrigger.addEventListener("refresh", setupSplits);
  // setupSplits();
  const copyRefs = useRef([]);

  useEffect(() => {
    const splits = [];
    const anims = [];

    copyRefs.current.forEach((el) => {
      // Split le texte
      const split = new SplitType(el, {
        types: "lines,words,chars",
        lineClass: "split-line",
      });
      splits.push(split);

      // Ajoute chaque ligne dans un parent div
      const lines = el.querySelectorAll(".split-line");
      lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("split-parent");
        line.parentNode.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });

      // Animation GSAP
      const anim = gsap.from(lines, {
        scrollTrigger: {
          trigger: el,
          toggleActions: "restart pause resume",
          start: "top 90%",
        },
        duration: 2,
        ease: "power4.inOut",
        yPercent: 100,
        stagger: 0.1,
      });

      anims.push(anim);
    });

    // Cleanup
    return () => {
      anims.forEach((a) => a.kill());
      splits.forEach((s) => s.revert());
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div style={{ height: "1200vh", backgroundColor: "white", zIndex: "5" }}>
      <div
        ref={containerRef}
        style={{
          position: "relative",
          height: "1200vh",
        }}
      >
        <section
          id="member1"
          className="members1 h-[300vh] w-full absolute top-0 z-30"
        >
          <div className="sticky top-0">
            <h1 className="titleMember1 text-black font-fujiwara text-5xl pl-4 pt-10 pb-4">
              Zinédine
            </h1>
            <a className="text-sm text-black bg-white border-black border-1 m-4 p-2 duration-300 hover:bg-black hover:text-white">
              Directeur Artistique / Chef de stratégie
            </a>

            <p className="copy hidden lg:block text-black text-sm pt-5">
              Zinedine est un artiste visuel. Il est excellent sur beaucoup de
              chose notamment pour transformer des idées en concepts visuels
              percutants. Chaque projet doit avoir sa personnalité et vous
              pouvez compter sur Zinedine pour la consolider. C’est également un
              chargé de communication en puissance qui a déjà accompagné
              plusieurs marques sur des stratégies pub. Doté d’un excellent
              relationnel, il sait fédérer les équipes et captiver les clients
              avec des propositions pertinentes.
            </p>
            <p
              ref={(el) => (copyRefs.current[0] = el)}
              className="copy block text-black text-sm p-5 lg:hidden"
            >
              Zinedine est un artiste visuel doué dans la transformation d'idées
              en concepts percutants. C’est également un chargé de communication
              en puissance qui a déjà accompagné plusieurs marques sur des
              stratégies pub. Il saura captiver les clients avec des
              propositions pertinentes.
            </p>
          </div>
        </section>
        <section className="members2 top-[300vh] h-[300vh] w-full absolute top-0 z-30">
          <div className="sticky top-0">
            <h1 className="titleMember1 text-black font-fujiwara text-5xl pl-4 pt-10 pb-4">
              Idrissa
            </h1>
            <a className="text-sm text-black bg-white border-black border-1 m-4 p-2 duration-300 hover:bg-black hover:text-white">
              Scénariste / Motion designer
            </a>

            <p className="copy hidden lg:block text-black text-sm pt-5">
              Zinedine est un artiste visuel. Il est excellent sur beaucoup de
              chose notamment pour transformer des idées en concepts visuels
              percutants. Chaque projet doit avoir sa personnalité et vous
              pouvez compter sur Zinedine pour la consolider. C’est également un
              chargé de communication en puissance qui a déjà accompagné
              plusieurs marques sur des stratégies pub. Doté d’un excellent
              relationnel, il sait fédérer les équipes et captiver les clients
              avec des propositions pertinentes.
            </p>
            <p
              ref={(el) => (copyRefs.current[0] = el)}
              className="copy text-black text-sm p-5 lg:hidden"
            >
              Zinedine est un artiste visuel doué dans la transformation d'idées
              en concepts percutants. C’est également un chargé de communication
              en puissance qui a déjà accompagné plusieurs marques sur des
              stratégies pub. Il saura captiver les clients avec des
              propositions pertinentes.
            </p>
          </div>
        </section>
        <section className="members3 top-[600vh] h-[300vh] w-full absolute top-0 z-30">
          <div className="sticky top-0">
            <h1 className="titleMember1 text-black font-fujiwara text-5xl pl-4 pt-10 pb-4">
              Ben
            </h1>
            <a className="text-sm text-black bg-white border-black border-1 m-4 p-2 duration-300 hover:bg-black hover:text-white">
              Réalisateur / Chef opérateur
            </a>

            <p className="copy hidden lg:block text-black text-sm pt-5">
              Zinedine est un artiste visuel. Il est excellent sur beaucoup de
              chose notamment pour transformer des idées en concepts visuels
              percutants. Chaque projet doit avoir sa personnalité et vous
              pouvez compter sur Zinedine pour la consolider. C’est également un
              chargé de communication en puissance qui a déjà accompagné
              plusieurs marques sur des stratégies pub. Doté d’un excellent
              relationnel, il sait fédérer les équipes et captiver les clients
              avec des propositions pertinentes.
            </p>
            <p
              ref={(el) => (copyRefs.current[0] = el)}
              className="copy block text-black text-sm p-5 lg:hidden"
            >
              Zinedine est un artiste visuel doué dans la transformation d'idées
              en concepts percutants. C’est également un chargé de communication
              en puissance qui a déjà accompagné plusieurs marques sur des
              stratégies pub. Il saura captiver les clients avec des
              propositions pertinentes.
            </p>
          </div>
        </section>
        <section className="members4 top-[900vh] h-[300vh] w-full absolute top-0 z-30">
          <div className="sticky top-0">
            <h1 className="titleMember1 text-black font-fujiwara text-5xl pl-4 pt-10 pb-4">
              Ousmane
            </h1>
            <a className="text-sm text-black bg-white border-black border-1 m-4 p-2 duration-300 hover:bg-black hover:text-white">
              Monteur / Artiste 3D
            </a>

            <p className="copy hidden w-1/2 lg:block text-black text-sm pt-5">
              Zinedine est un artiste visuel. Il est excellent sur beaucoup de
              chose notamment pour transformer des idées en concepts visuels
              percutants. Chaque projet doit avoir sa personnalité et vous
              pouvez compter sur Zinedine pour la consolider. C’est également un
              chargé de communication en puissance qui a déjà accompagné
              plusieurs marques sur des stratégies pub. Doté d’un excellent
              relationnel, il sait fédérer les équipes et captiver les clients
              avec des propositions pertinentes.
            </p>
            <p
              ref={(el) => (copyRefs.current[0] = el)}
              className="copy block text-black text-sm p-5 lg:hidden "
            >
              Zinedine est un artiste visuel doué dans la transformation d'idées
              en concepts percutants. C’est également un chargé de communication
              en puissance qui a déjà accompagné plusieurs marques sur des
              stratégies pub. Il saura captiver les clients avec des
              propositions pertinentes.
            </p>
          </div>
        </section>
        <div className="sticky h-screen top-0 object-cover lg:h-auto">
          <canvas
            ref={canvasRef}
            width={width <= 1024 ? 600 : 850}
            height={720}
            style={canvasResponsivity}
          />
        </div>
      </div>
    </div>
  );
};

export default MemberSection;
