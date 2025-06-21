import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Canvas } from "@react-three/fiber";
import { Piece } from "./3d/Piece";
import { CustomText } from "./3d/CustomText";
import { Environment } from "@react-three/drei";
import { useWindowSize } from "../utils/useWindowSize";
import Lenis from "lenis";
import logo from "/logo/logo.svg";

const LandingPage = () => {
  const lenisRef = useRef(null);
  const loadingScreenRef = useRef(null);
  const loadingLogoRef = useRef(null);
  const loadingBarRef = useRef(null);
  const entryScreenRef = useRef(null);
  const enterButtonRef = useRef(null);
  const videoTransitionRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const { width, height } = useWindowSize();

  let responsiveTextScale = 3;
  let responsiveCoinScale = 20;

  useEffect(() => {
    const lenis = new Lenis({
      // Valeur entre 0 et 1
      // Plus la valeur est faible, plus le scroll sera fluide
      lerp: 0.05,
      // Plus la valeur est haute, plus le défilement sera rapide
      wheelMultiplier: 1,
    });
    lenisRef.current = lenis;
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

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
              enableRotatingEffect={false}
              onClick={handleEnterClick}
            />
            <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/1k/studio_small_03_1k.exr" />
          </Canvas>
        </div>
      </div>

      {/* VIDEO DE TRANSITION 
      APRES AVOIR CLIQUE SUR LA PIECE EN 3D */}
      <div
        className="video-transition absolute w-full h-screen z-[70] opacity-0 pointer-events-none"
        ref={videoTransitionRef}
      >
        <video
          className="video-container absolute inset-0 w-full h-screen object-cover opacity-0"
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          ref={videoRef}
        >
          <source src="/videos/INTRO.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="video-mask absolute bottom-0 h-screen w-full"></div>
      {/* CONTENU DE LA LANDING PAGE, 
      S'AFFICHE AU DESSUS DE LA VIDEO DE TRANSITION */}
      <div
        className="main-content z-[80] absolute inset-0 flex flex-col opacity-0 pointer-events-none mix-blend-difference"
        ref={contentRef}
      >
        <div className="p-4">
          <img style={{ height: "3%", width: "auto" }} src={logo} alt="" />
        </div>
        <div className="absolute flex flex-col bottom-[50%] w-full p-5">
          <div className="w-full bottom-0 ">
            <div className="font-fujiwara-black-italic flex flex-row justify-between text-xs lg:text-base">
              <div className="w-1/3">
                <p>Basé à Paris</p>
              </div>

              <div className="w-1/3">
                <p className="">Réalisation</p>
              </div>
              <div className="w-1/3 ">
                <p>Post-Production</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full p-5">
          <div className="w-full bottom-0 ">
            <div className="font-fujiwara-bold flex flex-row justify-between text-xs lg:text-base">
              <div className="w-1/3">
                <a
                  href="https://www.instagram.com/agenceclairobscur?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  className=""
                >
                  [Instagram]
                </a>
              </div>

              <div className="w-1/3">
                <a href="https://www.linkedin.com/company/clair-obscur-vision/">
                  [Linkedin]
                </a>
              </div>
              <div className="w-1/3 ">2025 ©</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
