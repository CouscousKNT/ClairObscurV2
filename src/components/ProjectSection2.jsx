"use client";
import { useEffect, useRef } from "react";
import img1 from "/projects/moluki1.webp";
import img2 from "/projects/moluki2.webp";
import img3 from "/projects/moluki3.webp";

export const ProjectSection2 = () => {
  const titleProject2 = useRef(null);
  const backgroundTitleProject2 = useRef(null);
  const mainImageProject2 = useRef(null);
  const leftImageProject2 = useRef(null);
  const rightImageProject2 = useRef(null);

  // EFFET PARALLAXE
  useEffect(() => {
    const handleScroll = () => {
      const value = window.scrollY - 3000;
      titleProject2.current.style.top = value * 0.05 + "px";
      backgroundTitleProject2.current.style.top = value * 0.02 + "px";
      mainImageProject2.current.style.top = value * 0.065 + "px";
      leftImageProject2.current.style.top = value * 0.15 + "px";
      rightImageProject2.current.style.top = value * 0.075 + "px";
      console.log("Scroll : ", window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative content h-screen flex flex-col bg-white overflow-hidden">
      <div className="w-full">
        <h1
          ref={backgroundTitleProject2}
          className="font-fujiwara-black-italic text-gray-300 absolute top-0 text-[clamp(0.8rem,7vw,1.5rem)] sm:text-[clamp(0.8rem,10vw,1.7rem)] lg:text-[clamp(0.8rem,15vw,4rem)] "
        >
          Aux couleurs des tableaux
        </h1>
        <h1
          ref={titleProject2}
          className="font-fujiwara-black-italic text-black absolute top-0 text-[clamp(0.8rem,5vw,1.7rem)] lg:text-[clamp(0.8rem,3vw,4rem)] "
        >
          Aux couleurs des tableaux
        </h1>
      </div>

      <div className="m-10 sm:m-20 h-screen">
        <div className="w-full h-full grid grid-cols-20 grid-rows-20 ">
          {/* IMAGE PRICIPALE */}
          <div className="col-start-3 row-start-3 col-end-20 row-end-15 md:col-start-6 md:row-start-2 md:col-end-14 md:row-end-13 ">
            <img
              ref={mainImageProject2}
              className="object-cover w-full h-full"
              src={img1}
              alt=""
            />
          </div>
          {/* IMAGE DROITE */}
          <div className="row-start-9 row-end-14 col-start-11 col-end-20 md:row-start-8 md:col-start-12 md:h-[30vh] md:w-[50vh] lg:col-start-12 lg:row-start-7 lg:h-[40vh] lg:w-[70vh]">
            <img
              ref={rightImageProject2}
              className="absolute left-[15vw] md:left-[7vw] lg:left-0 object-cover w-full h-full"
              src={img2}
              alt=""
            />
          </div>
          {/* IMAGE GAUCHE */}
          <div className="row-start-8 row-end-12 col-start-1 col-end-10 md:row-start-7 md:h-[25vh] md:w-[40vh] lg:col-start-4 lg:row-start-9 lg:h-[25vh] lg:w-[40vh]">
            <img
              ref={leftImageProject2}
              className="absolute right-[7vw] md:right-0 lg:right-[7vw] object-cover w-full h-full"
              src={img3}
              alt=""
            />
          </div>
          <div
            className={`overflow-hidden bg-gray-900/70 bg-opacity-50 flex z-3 p-6 gap-6 row-start-4 col-start-12 w-[40vw] h-[30vh] md:w-full md:h-full md:row-start-3 md:row-end-11 md:col-start-13 md:col-end-18 md:w-full lg:row-start-3 lg:row-end-11 lg:col-start-11 lg:col-end-16 lg:w-full lg:h-full xl:col-start-11 xl:col-end-15`}
          >
            <div className="border-white border-l-1"></div>
            <div className="h-full w-full">
              <p className="text-white text-xs border-white lg:text-sm overflow-hidden">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[4vh] sm:top-[85vh] w-full flex justify-center items-center">
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
