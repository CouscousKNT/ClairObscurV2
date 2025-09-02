import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/all";
import { Canvas } from "@react-three/fiber";
import { Piece } from "../3d/Piece";
import { CustomText } from "../3d/CustomText";
import { Environment } from "@react-three/drei";
import { useWindowSize } from "../../utils/useWindowSize";
import Lenis from "lenis";
import logo from "/logo/logo.svg";
import Header from "../Header";

export const LandingPage = () => {
  const [rotateCoin, setRotateCoin] = useState(false);
  console.log(rotateCoin);

  const loadingScreenRef = useRef(null);
  const loadingLogoRef = useRef(null);
  const loadingBarRef = useRef(null);
  const entryScreenRef = useRef(null);
  const enterButtonRef = useRef(null);
  const pushCoinText = useRef(null);
  const split = useRef(null);
  const videoTransitionRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const { width, height } = useWindowSize();

  let responsiveTextScale = 3;
  let responsiveCoinScale = 20;

  useEffect(() => {
    // ANIMATION DE LA BARRE DE CHARGEMENT
    const tlLoading = gsap.timeline();
    tlLoading.to(
      loadingBarRef.current,
      {
        width: "100%",
        duration: 2,
        ease: "power1.inOut",
        onComplete: showEntryScreen,
      },
      0.5
    );

    // UNE FOIS L'ANIMATION DE CHARGEMENT TERMINEE, ON AFFICHE
    // L'ECRAN AVEC LA PIECE CLIQUABLE POUR DEMARRER L'EXPERIENCE
    function showEntryScreen() {
      gsap.to(loadingScreenRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => (loadingScreenRef.current.style.display = "none"),
      });

      gsap.to(entryScreenRef.current, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        pointerEvents: "all",
      });

      gsap.to(enterButtonRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.8,
      });
    }

    // Prechargement de la vidéo
    if (videoRef.current) {
      videoRef.current.load();
    }

    return () => {
      tlLoading.kill();
      gsap.killTweensOf([
        loadingScreenRef.current,
        loadingLogoRef.current,
        loadingBarRef.current,
        entryScreenRef.current,
        enterButtonRef.current,
        videoTransitionRef.current,
        videoRef.current,
        contentRef.current,
      ]);
    };
  }, []);

  // TAILLE DE LA PIECE 3D ET DU TEXTE 3D
  // EN FONCTION DE LA LARGEUR DE L'ECRAN
  if (width <= 640 || (width > height && width <= 640)) {
    responsiveCoinScale = 3;
    responsiveTextScale = 15;
  } else if (width <= 768) {
    responsiveCoinScale = 3.5;
    responsiveTextScale = 25;
  } else if (width <= 1024) {
    responsiveCoinScale = 3;
    responsiveTextScale = 20;
  } else if (width <= 1280) {
    responsiveCoinScale = 3;
    responsiveTextScale = 25;
  } else if (width > 1280) {
    responsiveCoinScale = 3;
    responsiveTextScale = 35;
  }

  // UNE FOIS LA PIECE CLIQUE, DISPARITION DE LA PAGE AVEC LA PIECE
  // ET APPARITION DE LA TRANSITION VIDEO
  const handleEnterClick = () => {
    gsap.to(entryScreenRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      pointerEvents: "none",
      onComplete: () => {
        entryScreenRef.current.style.display = "none";
      },
    });

    gsap.to(videoTransitionRef.current, {
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
      onStart: () => {
        videoRef.current.play();
        gsap.to(videoRef.current, {
          opacity: 1,
          duration: 1.5,
        });
      },
      onComplete: showMainContent,
    });
  };

  //  AFFICHAGE DES TEXTES DE LA LANDING PAGE
  const showMainContent = () => {
    gsap.to(contentRef.current, {
      opacity: 1,
      duration: 2,
      delay: 1.5,
      ease: "power2.out",
      pointerEvents: "all",
    });
  };

  // AFFICHAGE DU TEXTE INVITANT A APPUYER SUR LA PIECE
  useEffect(() => {
    if (!pushCoinText.current) return;

    // Split le texte en caractères
    split.current = new SplitText(pushCoinText.current, {
      type: "chars",
    });

    const chars = split.current.chars;

    // Animation d’apparition des lettres
    gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        delay: 3.5,
        stagger: 0.05,
        ease: "power2.out",
        duration: 0.5,
      }
    );

    return () => {
      // Nettoyage à la destruction du composant
      if (split.current) split.current.revert();
    };
  }, []);

  return (
    <div className="entry-experience h-screen">
      {/* ECRAN DE DEPART 
      CONTENANT LA BARRE DE CHARGEMENT */}
      <div
        className="loading-screen fixed h-screen inset-0 bg-white flex flex-col justify-center items-center z-[100]"
        ref={loadingScreenRef}
      >
        <img
          style={{ width: "128px", height: "auto", objectFit: "cover" }}
          className="loading-logo relative w-6 object-cover mb-[30px] mix-blend-difference"
          src={logo}
          ref={loadingLogoRef}
        />
        <div className="loading-bar-container w-[300px] h-[2px] bg-black/10 overflow-hidden">
          <div
            className="loading-bar h-full w-0 bg-black"
            ref={loadingBarRef}
          ></div>
        </div>
      </div>

      {/* PAGE CONTENANT LA PIECE EN 3D CLIQUABLE
      POUR DEMARER L'EXPERIENCE */}
      <div
        className="entry-screen fixed h-screen inset-0 flex flex-col justify-center items-center bg-black z-[90] opacity-0 pointer-events-none"
        ref={entryScreenRef}
      >
        <div className="h-[100vh] w-screen">
          <Canvas
            gl={{ antialias: false, preserveDrawingBuffer: false }}
            className="h-full"
          >
            <CustomText
              text={`Lancer la pièce.`}
              position={[0, 1.4, 0]}
              scale={responsiveTextScale}
            />
            <Piece
              scale={responsiveCoinScale}
              rotation={[0.9, 0, 0]}
              enableRotatingEffect={rotateCoin}
              onClick={handleEnterClick}
            />
            <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/1k/studio_small_03_1k.exr" />
          </Canvas>
        </div>
        <p
          ref={pushCoinText}
          className="absolute bottom-[20vh] font-fujiwara-black-italic text-xs sm:text-base"
        >
          Appuyez sur la pièce
        </p>
      </div>

      {/* VIDEO DE TRANSITION 
      APRES AVOIR CLIQUE SUR LA PIECE EN 3D */}
      <div
        className="video-transition absolute w-full h-screen z-[70] opacity-0 pointer-events-none"
        ref={videoTransitionRef}
      >
        <section className="w-full absolute top-10 md:top-20 flex justify-center items-center">
          <video
            className="video-container w-[95vw] max-w-[1400px] md:w-[97vw] md:max-w-[1800px] h-[90vh] mx-auto rounded-2xl shadow-lg object-cover opacity-0"
            muted
            playsInline
            loop
            webkit-playsinline="true"
            preload="auto"
            ref={videoRef}
          >
            <source src="/videos/landingvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </section>
      </div>
      <div className="video-mask absolute bottom-0 h-screen w-full"></div>

      {/* CONTENU DE LA LANDING PAGE, 
      S'AFFICHE AU DESSUS DE LA VIDEO DE TRANSITION */}
      <div
        className="main-content z-[80] absolute inset-0 flex flex-col opacity-0 pointer-events-none mix-blend-difference"
        ref={contentRef}
      >
        {/* <Header /> */}
        <h1 className="font-fujiwara-black-italic top-5 md:top-0 text-white text-center leading-none whitespace-nowrap text-[clamp(2rem,12vw,13rem)] relative z-50 mix-blend-difference">
          CLAIR OBSCUR
        </h1>
      </div>
    </div>
  );
};

export default LandingPage;
