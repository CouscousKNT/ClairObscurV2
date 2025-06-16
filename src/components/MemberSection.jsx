"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useWindowSize } from "../utils/useWindowSize";
import { object } from "framer-motion/client";
import "../App.css";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import SplitType from "split-type";
import { SplitText } from "gsap/all";
import classNames from "classnames";

gsap.registerPlugin(ScrollTrigger);

export const MemberSection = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const { width, height } = useWindowSize();
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const imagesLinkBasedOnDevice =
    width <= 1024 ? `/team/membersAnimationMobile/` : `/team/membersAnimation/`;

  const horizontalScreen = width > height;

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
          top: "0%",
          right: "0%",
          width: "auto",
          height: "100vh",
        }
      : {
          position: "absolute",
          top: "0",
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
    let loadedCount = 0;
    const totalImages = 311;

    // Preload first 10 images immediately
    const imagesToPreload = Math.min(10, totalImages);

    for (let i = 1; i <= totalImages; i++) {
      const img = new Image();
      img.src = imagesLinkBasedOnDevice + `${i}.webp`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount >= imagesToPreload && !imagesLoaded) {
          setImagesLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    return loadedImages;
  }, []);

  const render = useCallback(
    (index) => {
      if (images[index]) {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          if (images[index].complete) {
            context.drawImage(images[index], 0, 0, canvas.width, canvas.height);
          }
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
    if (imagesLoaded) {
      render(1); // Render first image once images are loaded
    }
  }, [imagesLoaded, render]);

  const quotes = document.querySelectorAll(".memberName");
  const descriptions = document.querySelectorAll(".description");

  function setupSplits() {
    quotes.forEach((quote) => {
      // Reset if needed
      if (quote.anim) {
        quote.anim.progress(1).kill();
        quote.split.revert();
      }

      quote.split = SplitText.create(quote, {
        type: "words,chars",
        linesClass: "split-line",
      });

      // Set up the anim
      quote.anim = gsap.from(quote.split.chars, {
        scrollTrigger: {
          trigger: quote,
          toggleActions: "restart pause restart reverse",
          start: "top center",
          end: "+=1500",
          // markers: { startColor: "#dfdcff", endColor: "transparent" },
        },
        duration: 0.8,
        ease: "circ.out",
        y: 80,
        stagger: 0.04,
      });
    });

    descriptions.forEach((desc) => {
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
          toggleActions: "play pause play reverse",
          start: "top center",
          end: "+=1500",
          // markers: { startColor: "#dfdcff", endColor: "red" },
        },
        duration: 0.8,
        ease: "circ.out",
        y: 80,
        stagger: 0.04,
      });
    });
  }

  ScrollTrigger.addEventListener("refresh", setupSplits);
  setupSplits();

  // On attend que le DOM soit prêt

  return (
    <div style={{ height: "1200vh", backgroundColor: "white", zIndex: "5" }}>
      <div
        ref={containerRef}
        style={{
          position: "relative",
          height: "1200vh",
          backgroundColor: "white",
        }}
      >
        <section
          id="member1"
          className="members1 mix-blend-difference h-[300vh] w-full absolute top-0 z-30"
        >
          <div className="sticky top-0">
            <h1 className="memberName text-white font-fujiwara-black text-5xl pl-4 pt-10 pb-4">
              Zinédine
            </h1>
            <a className="text-sm font-fujiwara-bold-italic text-white border-white border-1 m-4 p-2 duration-300 hover:bg-white hover:text-black">
              Directeur Artistique / Chef de stratégie
            </a>

            <p className="description font-fujiwara-light-italic text-white w-1/2 hidden lg:block lg:pl-4 lg:pt-16 text-xl xl:text-3xl/12 text-white pt-5">
              Zinedine est un artiste visuel. Il est excellent sur beaucoup de
              chose notamment pour transformer des idées en concepts visuels
              percutants. Chaque projet doit avoir sa personnalité et vous
              pouvez compter sur Zinedine pour la consolider. C’est également un
              chargé de communication en puissance qui a déjà accompagné
              plusieurs marques sur des stratégies pub. Doté d’un excellent
              relationnel, il sait fédérer les équipes et captiver les clients
              avec des propositions pertinentes.
            </p>
            <div>
              <p
                className={classNames(
                  "description lg:hidden p-5 font-fujiwara block text-white text-[clamp(0.8rem,4vw,1rem)] md:text-lg",
                  {
                    "w-[50%]": horizontalScreen,
                  }
                )}
              >
                Zinedine est un artiste visuel doué dans la transformation
                d'idées en concepts percutants. C’est également un chargé de
                communication en puissance qui a déjà accompagné plusieurs
                marques sur des stratégies pub. Il saura captiver les clients
                avec des propositions pertinentes.
              </p>
            </div>
          </div>
        </section>
        <section className="members2 mix-blend-difference top-[300vh] h-[300vh] w-full absolute top-0 z-30">
          <div className="sticky top-0">
            <h1 className="memberName text-white font-fujiwara-black text-5xl pl-4 pt-10 pb-4">
              Idrissa
            </h1>
            <a className="text-sm font-fujiwara-bold-italic text-white border-white border-1 m-4 p-2 duration-300 hover:bg-white hover:text-black">
              Scénariste / Motion designer
            </a>

            <p className="description font-fujiwara-light-italic text-white w-1/2 hidden lg:block lg:pl-4 lg:pt-16 text-xl xl:text-3xl/12 text-white pt-5">
              Idrissa nourrit sa créativité depuis son plus jeune âge en
              inventant des histoires en tous genres. Capable de visualiser des
              scènes fictives à partir de quelques mots, il a rapidement vu dans
              la vidéo « le meilleur outil pour raconter des histoires ». Pour
              donner vie à ses idées, il s’est spécialisé en motion design et
              montage vidéo. L’image et l’écriture se mêlent dans son travail,
              pour créer des récits visuels grandioses.
            </p>
            <p
              className={classNames(
                "description lg:hidden p-5 font-fujiwara block text-white text-[clamp(0.8rem,4vw,1rem)] md:text-lg",
                {
                  "w-[50%]": horizontalScreen,
                }
              )}
            >
              Idrissa nourrit sa créativité depuis son plus jeune âge en
              inventant des histoires en tous genres. A partir de quelques mots,
              Idrissa est capable de visualiser des scènes fictives. L’image et
              l’écriture se mêlent dans son travail, pour créer des récits
              visuels grandioses.
            </p>
          </div>
        </section>
        <section className="members3 mix-blend-difference top-[600vh] h-[300vh] w-full absolute top-0 z-30">
          <div className="sticky top-0">
            <h1 className="memberName text-white font-fujiwara-black text-5xl pl-4 pt-10 pb-4">
              Ben
            </h1>
            <a className="text-sm font-fujiwara-bold-italic text-white border-white border-1 m-4 p-2 duration-300 hover:bg-white hover:text-black">
              Réalisateur / Chef opérateur
            </a>

            <p className="description font-fujiwara-light-italic text-white w-1/2 hidden lg:block lg:pl-4 lg:pt-16 text-xl xl:text-3xl/12 text-white pt-5">
              Fabriqueur d’images, Ben est un as de la caméra. En charge de
              plusieurs documentaires de télévision et de publicités c’est une
              encyclopédie des codes de l’imagerie. Mouvements, angles,
              éclairages, donnez lui n’importe quel sujet qui possède au moins 3
              côtés et il saura vous le sublimer.
            </p>
            <p
              className={classNames(
                "description lg:hidden p-5 font-fujiwara block text-white text-[clamp(0.8rem,4vw,1rem)] md:text-lg",
                {
                  "w-[50%]": horizontalScreen,
                }
              )}
            >
              Fabriqueur d’images, Ben est un as de la caméra. En charge de
              plusieurs documentaires de télévision et de publicités c’est une
              encyclopédie des codes de l’imagerie. Mouvements, angles,
              éclairages, donnez lui n’importe quel sujet qui possède au moins 3
              côtés et il saura vous le sublimer.
            </p>
          </div>
        </section>
        <section className="members4 mix-blend-difference top-[900vh] h-[300vh] w-full absolute top-0 z-30">
          <div className="sticky top-0">
            <h1 className="memberName text-white font-fujiwara-black text-5xl pl-4 pt-10 pb-4">
              Ousmane
            </h1>
            <a className="text-sm font-fujiwara-bold-italic text-white border-white border-1 m-4 p-2 duration-300 hover:bg-white hover:text-black">
              Monteur / Artiste 3D
            </a>

            <p className="description font-fujiwara-light-italic text-white w-1/2 hidden lg:block lg:pl-4 lg:pt-16 text-xl xl:text-3xl/12 text-white pt-5">
              Installé sur la frontière entre le réel et l’utopie Ousmane
              cherche sans cesse à repousser les limites du possible. Ses
              inspirations, il va les chercher au plus profond du metaverse,
              tentant par tous les moyens de transformer l’illusoire en
              réalisable. Il se définit lui même comme un « dégénéré » et a
              choisi la 3D pour dépasser les limites humaines, sans jamais y
              trouver la fin. Cette science, il l’applique aussi dans sa
              capacité à monter des vidéos et c’est à notre grand bonheur.
            </p>
            <p
              className={classNames(
                "description lg:hidden p-5 font-fujiwara block text-white text-[clamp(0.8rem,4vw,1rem)] md:text-lg",
                {
                  "w-[50%]": horizontalScreen,
                }
              )}
            >
              Ousmane cherche sans cesse à transformer l’illusoire en
              réalisable. Il se définit lui même comme un « dégénéré » et a
              choisi la 3D pour dépasser les limites humaines, sans jamais y
              trouver la fin. Cette science, il l’applique aussi dans sa
              capacité à monter des vidéos et c’est à notre grand bonheur.
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
