"use client";
import React, { useEffect, useRef, useState } from "react";
import img1 from "/projects/img12.jpg";
import img2 from "/projects/img2.jpg";
import img3 from "/projects/actress.png";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useWindowSize } from "../utils/useWindowSize";

export const ProjectSection2 = () => {
  const container = useRef(null);
  const title1 = useRef(null);
  const title2 = useRef(null);
  const description = useRef(null);
  const image1 = useRef(null);
  const image2 = useRef(null);
  const { width, height } = useWindowSize();
  const tinyMobile = width < 400;
  const mobileHorizontal = width > height && height < 640;

  const titleYValue1 = -10;
  const titleYValue2 = -65;
  const descriptionYValue2 = -150;
  const imageYValue1 = -75;
  const imageYValue2 = -250;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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

        tl.to(title1.current, { y: titleYValue1 }, 0)
          .to(title2.current, { y: titleYValue2 }, 0)
          .to(description.current, { y: descriptionYValue2 }, 0)
          .to(image1.current, { y: imageYValue1 }, 0)
          .to(image2.current, { y: imageYValue2 }, 0);

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
    <div className="relative content h-screen flex flex-col bg-white overflow-hidden">
      <div className="w-full">
        <h1
          ref={title1}
          className="relative text-gray-300 font-fujiwara text-3xl top-10 left-2 lg:text-8xl z-[5]"
        >
          La grande échapée
        </h1>
        <h1
          ref={title2}
          className="absolute text-black font-fujiwara text-2xl top-23 left-2 lg:text-6xl lg:top-30 z-[5]"
        >
          La grande échapée
        </h1>
      </div>

      <div ref={container} className="mt-[10vh] h-screen">
        <div
          ref={description}
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
            ref={image1}
            className="absolute top-[45vh] -right-[2vw] h-[25vh] w-[40vw] z-[2] lg:top-[25vh] lg:left-[50vw] lg:h-[40vh] lg:w-[70vh]"
          >
            <img className="object-cover w-full h-full" src={img2} alt="" />
          </div>
          <div
            ref={image2}
            className={`absolute top-[45vh] left-[2vw] h-[30vh] w-[40vw] z-[3] lg:top-[60vh] lg:left-[11vw] lg:h-[25vh] lg:w-[40vh]`}
          >
            <img className="object-cover w-full h-full" src={img3} alt="" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-[4vh] sm:top-[85vh]  w-full flex justify-center items-center">
        <a
          className="h-10 border-black text-black border-1 flex justify-center items-center pl-4 pr-4 transition duration-300 hover:text-white hover:bg-black hover:border-white"
          href="#"
        >
          Dévouvrir
        </a>
        <p className="text-black text-xs pl-4">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat.
        </p>
        {/* <div className="w-8 h-full border-white border-l-1"></div> */}
      </div>
    </div>
  );
};

export default ProjectSection2;
