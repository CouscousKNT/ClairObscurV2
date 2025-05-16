"use client";
import React, { useLayoutEffect, useRef } from "react";
import img1 from "/projects/img12.jpg";
import img2 from "/projects/img2.jpg";
import img3 from "/projects/actress.png";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export const Project1 = () => {
  const container = useRef(null);
  const title1 = useRef(null);
  const title2 = useRef(null);
  const description = useRef(null);
  const image1 = useRef(null);
  const image2 = useRef(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
        .to(title1.current, { y: -50 }, 0)
        .to(title2.current, { y: -65 }, 0)
        .to(description.current, { y: -300 }, 0)
        .to(image1.current, { y: -150 }, 0)
        .to(image2.current, { y: -500 }, 0);
    });
    return () => {
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative content h-screen flex flex-col bg-white p-8 overflow-hidden">
      <div className="w-full">
        <h1 ref={title1} class="text-gray-300 font-fujiwara text-3xl pt-6">
          La grande échapée
        </h1>
        <h1
          ref={title2}
          class="absolute text-black font-fujiwara text-2xl top-18"
        >
          La grande échapée
        </h1>
      </div>
      {/* <div className="w-full pt-[10vh]">
        <div className="absolute flex bg-gray-900/70 bg-opacity-50 w-42 sm:w-64 sm:h-64 left-[53%] z-3 p-6 gap-6">
          <div className="border-white border-l-1"></div>
          <div>
            <p className="text-white text-xs border-black">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam
            </p>
            <p className="hidden sm:hidden sm:text-white sm:text-xs">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam
            </p>
          </div>
        </div>
        <div className="absolute w-[50vw] h-auto object-cover pt-[2vh] z-1">
          <img src={img1} alt="Logo" />
        </div>
        <div className="absolute w-[72vw] h-auto object-cover left-[27vw] pt-[27vh] z-2">
          <img src={img2} alt="Logo" />
        </div>
        <div className="absolute w-[50vw] h-auto object-cover left-[2vw] pt-[32vh] z-2">
          <img src={img3} alt="Logo" />
        </div>
      </div> */}

      <div ref={container} className="mt-[10vh] min-h-[100vh]">
        <div
          ref={description}
          className="absolute top-[40vh] flex bg-gray-900/70 bg-opacity-50 w-42 sm:w-64 sm:h-64 left-[53%] z-3 p-6 gap-6"
        >
          <div className="border-white border-l-1"></div>
          <div className="h-full w-full">
            <p className="text-white text-xs border-black">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam
            </p>
            <p className="sm:text-white sm:text-xs">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat. Ut wisi enim ad minim veniam
            </p>
          </div>
        </div>
        <div className="flex w-full justify-center relative">
          <div className="absolute object-cover left-[20vw] top-[0vh] h-[60vh] w-[80vh] z-1">
            <img className="" src={img1} alt="" />
          </div>
          <div
            ref={image1}
            className="absolute top-[25vh] left-[45vw] h-[40vh] w-[70vh] z-[2]"
          >
            <img className="object-cover w-full h-full" src={img2} alt="" />
          </div>
          <div
            ref={image2}
            className="absolute top-[65vh] left-[11vw] h-[25vh] w-[40vh] z-[3]"
          >
            <img className="object-cover w-full h-full" src={img3} alt="" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 sm:top-[85vh] text-black w-4/5 flex justify-center items-center ">
        <a
          className="h-10 border-black border-1 flex justify-center items-center pl-4 pr-4"
          href="#"
        >
          Dévouvrir
        </a>
        <p className="text-black text-xs pl-4 sm:pl-8">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat.
        </p>
        <div className="h-[50%] border-black border-r-1 pl-4"></div>
      </div>
    </div>
  );
};

export default Project1;
