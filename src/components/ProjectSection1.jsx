"use client";
import React, { useEffect, useRef, useState } from "react";
import img1 from "/projects/colere.jpg";
import img2 from "/projects/boxe.jpg";
import img3 from "/projects/tableaux.jpg";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useWindowSize } from "../utils/useWindowSize";

export const ProjectSection1 = () => {
  const container = useRef(null);
  const title3 = useRef(null);
  const title4 = useRef(null);
  const description2 = useRef(null);
  const image3 = useRef(null);
  const image4 = useRef(null);
  const { width, height } = useWindowSize();
  const tinyMobile = width < 400;
  const mobileHorizontal = width > height && height < 640;

  const titleYValue3 = -10;
  const titleYValue4 = -65;
  const descriptionYValue = -150;
  const imageYValue3 = -75;
  const imageYValue4 = -250;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.refresh(true);

    const runAnimation = () => {
      const context = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        tl.to(title3.current, { y: titleYValue3 }, 0)
          .to(title4.current, { y: titleYValue4 }, 0)
          .to(description2.current, { y: descriptionYValue }, 0)
          .to(image3.current, { y: imageYValue3 }, 0)
          .to(image4.current, { y: imageYValue4 }, 0);

        ScrollTrigger.refresh();
      });

      return () => context.revert();
    };

    const images = Array.from(document.images);
    const unloaded = images.filter((img) => !img.complete);

    if (unloaded.length === 0) {
      runAnimation();
    } else {
      const listeners = [];
      unloaded.forEach((img) => {
        const onLoad = () => {
          if (unloaded.every((i) => i.complete)) {
            runAnimation();
          }
        };
        img.addEventListener("load", onLoad);
        listeners.push(() => img.removeEventListener("load", onLoad));
      });

      return () => {
        listeners.forEach((remove) => remove());
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, []);

  return (
    <div className="relative content h-screen flex flex-col bg-black overflow-hidden">
      <div className="w-full">
        <h1
          ref={title3}
          style={{ color: "#313131" }}
          className="relative text-gray-300 font-fujiwara text-3xl top-10 left-2 lg:text-8xl z-[5]"
        >
          Aux couleurs des tableaux
        </h1>
        <h1
          ref={title4}
          className="absolute text-white font-fujiwara text-2xl top-23 left-2 lg:text-6xl lg:top-30 z-[5]"
        >
          Aux couleurs des tableaux
        </h1>
      </div>

      <div ref={container} className="mt-[10vh] h-screen">
        <div
          ref={description2}
          className={`${tinyMobile ? "hidden" : "absolute"} ${
            mobileHorizontal ? "w-42 sm:w-22 md:w-42 lg:w-52" : "sm-w-64"
          } w-42 left-[50%] top-[45vh] bg-gray-900/70 bg-opacity-50 flex z-3 p-6 gap-6 sm:w-64 sm:h-64 lg:left-[55%] lg:h-auto`}
        >
          <div className="border-white border-l-1"></div>
          <div className="h-full w-full">
            <p className="text-white text-xs border-white lg:text-sm">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam
            </p>
          </div>
        </div>
        <div className="flex w-full justify-center relative">
          <div className="absolute object-cover top-[0vh] h-[60vh] w-[70vw] z-1 lg:left-[25vw] lg:top-[0vh] lg:h-[60vh] lg:w-[80vh]">
            <img className="" src={img1} alt="" />
          </div>
          <div
            ref={image3}
            className="absolute top-[45vh] -right-[2vw] h-[25vh] w-[40vw] z-[2] lg:top-[25vh] lg:left-[50vw] lg:h-[40vh] lg:w-[70vh]"
          >
            <img className="object-cover w-full h-full" src={img2} alt="" />
          </div>
          <div
            ref={image4}
            className={`absolute top-[45vh] left-[2vw] h-[30vh] w-[40vw] z-[3] lg:top-[60vh] lg:left-[11vw] lg:h-[25vh] lg:w-[40vh]`}
          >
            <img className="object-cover w-full h-full" src={img3} alt="" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-[4vh] sm:top-[85vh]  w-full flex justify-center items-center">
        <a
          className="h-10 border-white text-white border-1 flex justify-center items-center pl-4 pr-4 transition duration-300 hover:text-black hover:bg-white hover:border-black"
          href="#"
        >
          Dévouvrir
        </a>
        <p className="text-white text-xs pl-4">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat.
        </p>
        {/* <div className="w-8 h-full border-white border-l-1"></div> */}
      </div>
    </div>
  );
};

export default ProjectSection1;
