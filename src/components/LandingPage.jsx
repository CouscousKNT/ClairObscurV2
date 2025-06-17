import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import logo from "/logo/logo.svg";
import { Canvas } from "@react-three/fiber";
import { Piece } from "./3d/Piece";
import CustomText from "./3d/CustomText";
import { Environment } from "@react-three/drei";
import { useWindowSize } from "../utils/useWindowSize";
import Lenis from "lenis";
import { isMobile } from "react-device-detect";

const LandingPage = () => {
  // Refs for GSAP animations
  const lenisRef = useRef(null);
  const loadingScreenRef = useRef(null);
  const loadingLogoRef = useRef(null);
  const loadingBarRef = useRef(null);
  const entryScreenRef = useRef(null);
  const entryTitleRef = useRef(null);
  const enterButtonRef = useRef(null);
  const videoTransitionRef = useRef(null);
  const videoRef = useRef(null);
  const mainContentRef = useRef(null);
  const mainTitleRef = useRef(null);
  const mainSubtitleRef = useRef(null);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const lenis = new Lenis({
      // Valeur entre 0 et 1
      // Valeur par défaut : 0,1
      // Plus la valeur est faible, plus le scroll sera fluide
      lerp: 0.05,
      // Valeur par défaut : 1
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
    // Initial loading animation
    const tlLoading = gsap.timeline();

    // Logo animation

    // Loading bar animation (simulating load)
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

    function showEntryScreen() {
      // Hide loading screen
      gsap.to(loadingScreenRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => (loadingScreenRef.current.style.display = "none"),
      });

      // Show entry screen
      gsap.to(entryScreenRef.current, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        pointerEvents: "all",
      });

      // Animate entry elements
      gsap.to(entryTitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.5,
      });

      gsap.to(enterButtonRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.8,
      });
    }

    // Preload video
    if (videoRef.current) {
      videoRef.current.load();
    }

    // Clean up animations on component unmount
    return () => {
      tlLoading.kill();
      gsap.killTweensOf([
        loadingScreenRef.current,
        loadingLogoRef.current,
        loadingBarRef.current,
        entryScreenRef.current,
        entryTitleRef.current,
        enterButtonRef.current,
        videoTransitionRef.current,
        videoRef.current,
        mainContentRef.current,
        mainTitleRef.current,
        mainSubtitleRef.current,
      ]);
    };
  }, []);

  const handleEnterClick = () => {
    // Fade out entry screen
    console.log(entryScreenRef.current.style);

    gsap.to(entryScreenRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      pointerEvents: "none",
      onComplete: () => {
        // Une fois l'animation terminée, on cache complètement l'élément
        entryScreenRef.current.style.display = "none";
      },
    });

    // Show video transition
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

  const showMainContent = () => {
    // Hide video transition
    // Show main content
    gsap.to(mainContentRef.current, {
      opacity: 1,
      duration: 2,
      delay: 1.5,
      ease: "power2.out",
      pointerEvents: "all",
    });
  };

  let responsiveTextScale = 3;
  let responsiveCoinScale = 20;

  if (width <= 640 || (width > height && width <= 640)) {
    console.log("caac");
    console.log("sm");
    responsiveCoinScale = 3;
    responsiveTextScale = 15;
  } else if (width <= 768) {
    console.log("md");
    responsiveCoinScale = 3.5;
    responsiveTextScale = 25;
  } else if (width <= 1024) {
    console.log("lg");
    responsiveCoinScale = 3;
    responsiveTextScale = 20;
  } else if (width <= 1280) {
    console.log("xl");
    responsiveCoinScale = 3;
    responsiveTextScale = 25;
  } else if (width > 1280) {
    console.log("2xl");
    responsiveCoinScale = 3;
    responsiveTextScale = 35;
  }

  return (
    <div className="entry-experience h-screen">
      {/* Loading Screen */}
      <div
        className="loading-screen fixed inset-0 bg-white flex flex-col justify-center items-center z-[100]"
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

      {/* Entry Screen */}
      <div
        className="entry-screen fixed inset-0 flex flex-col justify-center items-center bg-black z-[90] opacity-0 pointer-events-none"
        ref={entryScreenRef}
      >
        {/* <div className="">
          <h1 className="font-fujiwara">"Lancez la pièce"</h1>
        </div> */}
        <div className="h-[100vh] w-screen">
          <Canvas className="h-full">
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
        {/* <button
          className="enter-button bg-transparent text-white border border-white/30 px-[45px] py-[15px] text-base uppercase tracking-wider cursor-pointer transition-all duration-300 ease-in-out opacity-0 translate-y-5 relative overflow-hidden hover:border-white/80 hover:bg-white/5"
          ref={enterButtonRef}
          onClick={handleEnterClick}
        >
          Démarrer
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700 ease-in-out" />
        </button> */}
      </div>

      {/* Video Transition */}
      <div
        className="video-transition bg-black z-[80] opacity-0 pointer-events-none"
        ref={videoTransitionRef}
      >
        <video
          className="video-container absolute inset-0 w-full h-full object-cover opacity-0"
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

      {/* Main Content */}
      <div
        className="main-content z-[90] absolute inset-0 flex flex-col opacity-0 pointer-events-none mix-blend-difference"
        ref={mainContentRef}
      >
        <div className="p-4">
          <img style={{ height: "3%", width: "auto" }} src={logo} alt="" />
        </div>
        <h1
          className="main-title text-5xl font-light mb-8 tracking-[0.5rem]"
          ref={mainTitleRef}
        ></h1>
        <div className="absolute flex flex-col bottom-[50%] w-full p-5">
          <div className="w-full bottom-0 ">
            <div className="font-fujiwara-black-italic flex flex-row justify-between text-xs lg:text-base">
              <div className="w-1/3">
                <p>Ecriture</p>
              </div>

              <div className="w-1/3">
                <p className="">Réalisation</p>
              </div>
              <div className="w-1/3 ">
                <p>Post-Production</p>
              </div>
              <div className="">
                <p>Lorem</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full p-5">
          <div className="w-full bottom-0 ">
            <div className="font-fujiwara-medium flex flex-row justify-between text-xs lg:text-base">
              <div className="w-1/3">
                <p>Basé à Paris</p>
              </div>

              <div className="w-1/3">
                <a
                  href="https://www.instagram.com/agenceclairobscur?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  className=""
                >
                  [Instagram]
                </a>
              </div>
              <div className="w-1/3 ">
                <a href="https://www.linkedin.com/company/clair-obscur-vision/">
                  [Linkedin]
                </a>
              </div>
              <div className="">
                <p>2025©</p>
              </div>
            </div>
          </div>
        </div>
        <p
          className="main-subtitle font-light tracking-[0.3rem] mb-12 opacity-70"
          ref={mainSubtitleRef}
        ></p>
      </div>
    </div>
  );
};

export default LandingPage;
