"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useWindowSize } from "../../utils/useWindowSize";
import "../../App.css";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import { LettersTextAnimation } from "../../components/textAnimations/LettersTextAnimation";
import { ParagraphAnimation } from "../../components/textAnimations/ParagraphAnimation";
import classNames from "classnames";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export const Credits = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef();
  const scrollIconAnimation = useRef(null);
  const { width, height } = useWindowSize();
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const location = useLocation();

  useEffect(() => {
    // Reset scroll position
    window.scrollTo(0, 0);
    // Refresh Lenis if available
    if (window.lenis && typeof window.lenis.resize === "function") {
      window.lenis.resize();
      if (typeof window.lenis.scrollTo === "function") {
        window.lenis.scrollTo(0, { immediate: true });
      }
    }
  }, [location.pathname]);

  // ANIMATION DU TEXTE "SCROLLEZ VERS LE BAS" LORSQU'ON ATTEINT LA SECTION MEMBRE
  useEffect(() => {
    const timeout = setTimeout(() => {
      const scrollDownAnimation = scrollIconAnimation.current;

      // Animation d'apparition de l'icône animée de Scroll vers le bas
      gsap.fromTo(
        scrollDownAnimation,
        {
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: "#member1",
            start: "top center",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          ease: "power2.out",
          duration: 0.5,
        },
      );

      // Animation de disparition de l'icône animée de Scroll vers le bas
      gsap.fromTo(
        scrollDownAnimation,
        {
          opacity: 1,
        },
        {
          scrollTrigger: {
            trigger: "#member4",
            start: "top center",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          ease: "power2.out",
          duration: 0.5,
        },
      );
      ScrollTrigger.refresh();
      scrollDownAnimation.style.opacity = 0;
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // PARAMETRE DE RESPONSIVITE
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

  // ANIMATION DES MEMBRES DE L'EQUIPE BASEE SUR LE SCROLL
  const imagesLinkBasedOnDevice =
    width <= 1024 ? `/team/morphAnimMobile/` : `/team/morphAnim/`;

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
    [images],
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

  return (
    <div>
      <Header />
      {/* <div className="h-screen bg-white mix-blend-diffrence text-black font-fujiwara-medium-italic">
        « Clair Obscur est avant tout un collectif de créatifs passionnés, à la
        fois fous et audacieux, animés par l’envie de repousser sans cesse les
        limites de l’imaginaire. Chaque projet est pour nous une nouvelle
        aventure, un terrain d’expérimentation où se mêlent audace artistique et
        maîtrise technique. Notre équipe se distingue par des capacités
        exceptionnelles : une écriture inspirée, une réalisation exigeante, un
        œil affûté pour l’image et une précision redoutable en post-production.
        Ensemble, nous donnons vie à des univers singuliers qui marquent les
        esprits et transforment l’ordinaire en expérience visuelle unique. »
      </div> */}
      <div id="memberSection" className="h-[1200vh] bg-white z-5">
        <div ref={containerRef} className="relative h-[1200vh] bg-white">
          <div className="font-fujiwara-black-italic w-full bottom-10 fixed flex flex-col justify-center items-center gap-4 mix-blend-difference z-10 bottom-0">
            <div
              id="scrollAnimation"
              ref={scrollIconAnimation}
              className="relative h-[50px] w-[30px] right-[15px]"
            ></div>
            <LettersTextAnimation
              triggerStart={"#member1"}
              triggerEnd={"#member4"}
              start={"top center"}
              end={""}
              stagger={0.05}
              duration={0.5}
              text={"Défilez vers le bas"}
              className={"text-xs sm:text-base"}
            />
          </div>

          {/* SECTION MEMBRE 1 */}
          <section
            id="member1"
            className="absolute top-0 z-20 w-full h-[300vh] mix-blend-difference "
          >
            <div className="sticky top-0">
              <LettersTextAnimation
                triggerStart={"#member1"}
                triggerEnd={"#member2"}
                start={"top center"}
                end={""}
                stagger={0.05}
                duration={0.5}
                text={"Zinédine"}
                className={
                  "pl-4 pt-27 lg:pt-40 pb-4 font-fujiwara-black text-white text-5xl"
                }
              />
              <a className="m-4 p-2 font-fujiwara-bold-italic text-white text-sm  border-white border-1 duration-300 hover:bg-white hover:text-black">
                Directeur Artistique / Chef de stratégie
              </a>
              <ParagraphAnimation
                triggerStart={"#member1"}
                triggerEnd={"#member2"}
                start={"top center"}
                end={""}
                stagger={0.04}
                duration={0.8}
                text={`

                Zinedine est un artiste visuel. Il est excellent sur beaucoup de chose 
                notamment pour transformer des idées en concepts visuels percutants. Chaque 
                projet doit avoir sa personnalité et vous pouvez compter sur Zinedine pour 
                la consolider. C’est également un chargé de communication en puissance qui 
                a déjà accompagné plusieurs marques sur des stratégies pub. Doté d’un 
                excellent relationnel, il sait fédérer les équipes et captiver les clients 
                avec des propositions pertinentes.
              `}
                className={
                  "hidden w-1/2 pt-5 font-fujiwara-light-italic text-white lg:block lg:pl-4 lg:pt-16 text-xl xl:text-3xl/12 text-white"
                }
              />
              <div>
                <ParagraphAnimation
                  triggerStart={"#member1"}
                  triggerEnd={"#member2"}
                  start={"top center"}
                  end={""}
                  stagger={0.04}
                  duration={0.8}
                  text={`

                Zinedine est un artiste visuel doué dans la transformation
                d'idées en concepts percutants. C’est également un chargé de
                communication en puissance qui a déjà accompagné plusieurs
                marques sur des stratégies pub. Il saura captiver les clients
                avec des propositions pertinentes.
              `}
                  className={classNames(
                    "lg:hidden p-5 font-fujiwara block text-white text-[clamp(0.8rem,4vw,1rem)] md:text-lg",
                    {
                      "w-[50%]": horizontalScreen,
                    },
                  )}
                />
              </div>
            </div>
          </section>

          {/* SECTION MEMBRE 2 */}
          <section
            id="member2"
            className="absolute top-[300vh] z-20 w-full h-[300vh] mix-blend-difference"
          >
            <div className="sticky top-0">
              <LettersTextAnimation
                triggerStart={"#member2"}
                triggerEnd={"#member3"}
                start={"top center"}
                end={""}
                stagger={0.05}
                duration={0.5}
                text={"Idrissa"}
                className={
                  "pl-4 pt-27 lg:pt-40 pb-4 font-fujiwara-black text-white text-5xl"
                }
              />
              <a className="m-4 p-2 font-fujiwara-bold-italic text-white text-sm  border-white border-1 duration-300 hover:bg-white hover:text-black">
                Scénariste / Motion designer
              </a>
              <ParagraphAnimation
                triggerStart={"#member2"}
                triggerEnd={"#member3"}
                start={"top center"}
                end={""}
                stagger={0.04}
                duration={0.8}
                text={`
              Idrissa nourrit sa créativité depuis son plus jeune âge en
              inventant des histoires en tous genres. Capable de visualiser des
              scènes fictives à partir de quelques mots, il a rapidement vu dans
              la vidéo « le meilleur outil pour raconter des histoires ». Pour
              donner vie à ses idées, il s’est spécialisé en motion design et
              montage vidéo. L’image et l’écriture se mêlent dans son travail,
              pour créer des récits visuels grandioses.
              `}
                className={
                  "hidden w-1/2 pt-5 font-fujiwara-light-italic text-white lg:block lg:pl-4 lg:pt-16 text-xl xl:text-3xl/12 text-white"
                }
              />
              <div>
                <ParagraphAnimation
                  triggerStart={"#member2"}
                  triggerEnd={"#member3"}
                  start={"top center"}
                  end={""}
                  stagger={0.04}
                  duration={0.8}
                  text={`
              Idrissa nourrit sa créativité depuis son plus jeune âge en
              inventant des histoires en tous genres. A partir de quelques mots,
              Idrissa est capable de visualiser des scènes fictives. L’image et
              l’écriture se mêlent dans son travail, pour créer des récits
              visuels grandioses.
              `}
                  className={classNames(
                    "lg:hidden p-5 font-fujiwara block text-white text-[clamp(0.8rem,4vw,1rem)] md:text-lg",
                    {
                      "w-[50%]": horizontalScreen,
                    },
                  )}
                />
              </div>
            </div>
          </section>

          {/* SECTION MEMBRE 3 */}
          <section
            id="member3"
            className="absolute top-[600vh] z-20 w-full h-[300vh] mix-blend-difference"
          >
            <div className="sticky top-0">
              <LettersTextAnimation
                triggerStart={"#member3"}
                triggerEnd={"#member4"}
                start={"top center"}
                end={""}
                stagger={0.05}
                duration={0.5}
                text={"Ben"}
                className={
                  "pl-4 pt-27 lg:pt-40 pb-4 font-fujiwara-black text-white text-5xl"
                }
              />
              <a className="m-4 p-2 font-fujiwara-bold-italic text-white text-sm  border-white border-1 duration-300 hover:bg-white hover:text-black">
                Réalisateur / Chef opérateur
              </a>
              <ParagraphAnimation
                triggerStart={"#member3"}
                triggerEnd={"#member4"}
                start={"top center"}
                end={""}
                stagger={0.04}
                duration={0.8}
                text={`
              Fabriqueur d’images, Ben est un as de la caméra. En charge de
              plusieurs documentaires de télévision et de publicités c’est une
              encyclopédie des codes de l’imagerie. Mouvements, angles,
              éclairages, donnez lui n’importe quel sujet qui possède au moins trois
              côtés et il saura vous le sublimer.
              `}
                className={
                  "hidden w-1/2 pt-5 font-fujiwara-light-italic text-white lg:block lg:pl-4 lg:pt-16 text-xl xl:text-3xl/12 text-white"
                }
              />
              <div>
                <ParagraphAnimation
                  triggerStart={"#member3"}
                  triggerEnd={"#member4"}
                  start={"top center"}
                  end={""}
                  stagger={0.04}
                  duration={0.8}
                  text={`
              Fabriqueur d’images, Ben est un as de la caméra. En charge de
              plusieurs documentaires de télévision et de publicités c’est une
              encyclopédie des codes de l’imagerie. Mouvements, angles,
              éclairages, donnez lui n’importe quel sujet qui possède au moins 3
              côtés et il saura vous le sublimer.
              `}
                  className={classNames(
                    "lg:hidden p-5 font-fujiwara block text-white text-[clamp(0.8rem,4vw,1rem)] md:text-lg",
                    {
                      "w-[50%]": horizontalScreen,
                    },
                  )}
                />
              </div>
            </div>
          </section>

          {/* SECTION MEMBRE 4 */}
          <section
            id="member4"
            className="absolute top-[900vh] z-20 w-full h-[300vh] mix-blend-difference"
          >
            <div className="sticky top-0">
              <LettersTextAnimation
                triggerStart={"#member4"}
                triggerEnd={""}
                start={"top center"}
                end={""}
                stagger={0.05}
                duration={0.5}
                text={"Ousmane"}
                className={
                  "pl-4 pt-27 lg:pt-40 pb-4 font-fujiwara-black text-white text-5xl"
                }
              />
              <a className="m-4 p-2 font-fujiwara-bold-italic text-white text-sm border-white border-1 duration-300 hover:bg-white hover:text-black">
                Monteur / Artiste 3D
              </a>

              <ParagraphAnimation
                triggerStart={"#member4"}
                triggerEnd={"#contact"}
                start={"top center"}
                end={""}
                stagger={0.04}
                duration={0.8}
                text={`
              Installé sur la frontière entre le réel et l’utopie Ousmane
              cherche sans cesse à repousser les limites du possible,
              tentant par tous les moyens de transformer l’illusoire en
              réalisable. Il se définit lui même comme un « dégénéré » et a
              choisi la 3D pour dépasser les limites humaines, sans jamais y
              trouver la fin. Cette science, il l’applique aussi dans sa
              capacité à monter des vidéos et c’est à notre grand bonheur.
              `}
                className={
                  "hidden w-1/2 pt-5 font-fujiwara-light-italic text-white lg:block lg:pl-4 lg:pt-16 text-xl xl:text-3xl/12 text-white"
                }
              />
              <div>
                <ParagraphAnimation
                  triggerStart={"#member4"}
                  triggerEnd={"#contact"}
                  start={"top center"}
                  end={""}
                  stagger={0.04}
                  duration={0.8}
                  text={`
              Installé sur la frontière entre le réel et l’utopie Ousmane
              cherche sans cesse à repousser les limites du possible,
              tentant par tous les moyens de transformer l’illusoire en
              réalisable. Il se définit lui même comme un « dégénéré » et a
              choisi la 3D pour dépasser les limites humaines, sans jamais y
              trouver la fin. Cette science, il l’applique aussi dans sa
              capacité à monter des vidéos et c’est à notre grand bonheur.
              `}
                  className={classNames(
                    "lg:hidden p-5 font-fujiwara block text-white text-[clamp(0.8rem,4vw,1rem)] md:text-lg",
                    {
                      "w-[50%]": horizontalScreen,
                    },
                  )}
                />
              </div>
            </div>
          </section>

          {/* CANVAS CONTENANT L'ANIMATION DES MEMBRES BASEE SUR LE SCROLL */}
          <div className="membersCanvas sticky top-0 h-screen object-cover lg:h-auto">
            <canvas
              ref={canvasRef}
              width={width <= 1024 ? 333 : 600}
              height={width <= 1024 ? 400 : 520}
              style={canvasResponsivity}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credits;
