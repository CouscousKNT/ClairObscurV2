// SliderGsap.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./styles.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SliderGsap = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;

    // Contexte GSAP (facilite le cleanup en React)
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray(".slide");
      const totalSlides = slides.length;

      // Calcule une “section” de scroll par slide
      const sectionHeight =
        (document.body.scrollHeight - window.innerHeight) / totalSlides;

      slides.forEach((slide, index) => {
        // z-index dynamique
        gsap.to(slide, {
          zIndex: (progress) => (progress < 0.5 ? 1 : 5 - index),
          scrollTrigger: {
            start: sectionHeight * index + " top",
            end: sectionHeight * (index + 1) + " top",
            scrub: 1,
          },
        });

        // scale du slide
        gsap.fromTo(
          slide,
          { scale: index === 0 ? 1 : 0 },
          {
            scale: 1,
            scrollTrigger: {
              start: sectionHeight * index + " top",
              end: sectionHeight * (index + 1) + " top",
              scrub: 1,
            },
          }
        );

        // scale de l'image interne (sauf la première)
        if (index !== 0) {
          const img = slide.querySelector(".slide-img");
          if (img) {
            gsap.fromTo(
              img,
              { scale: 2 },
              {
                scale: 1,
                top: "0%",
                scrollTrigger: {
                  start: sectionHeight * index + " top",
                  end: sectionHeight * (index + 1) + " top",
                  scrub: 1,
                },
              }
            );
          }
        }
      });
    }, rootRef);

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert(); // supprime animations/triggers créés dans ce contexte
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div ref={rootRef} className="relative h-[450vh] w-screen">
      {/* Conteneur “long” pour permettre le scroll */}
      <div className="sticky top-0 left-0 w-screen h-screen z-1">
        {/* Slides superposés en plein écran */}
        <div className="slide absolute top-0 left-0 w-screen h-screen overflow-hidden">
          <img
            src="/projects/aux_couleurs_des_tableaux/img15.webp"
            className="absolute top-0 left-0 w-full h-full object-cover"
            alt="Description of Image 4"
          />
        </div>
        <div className="slide absolute top-0 left-0 w-screen h-screen overflow-hidden">
          <img
            src="/projects/aux_couleurs_des_tableaux/img15.webp"
            className="absolute top-0 left-0 w-full h-full object-cover"
            alt="Description of Image 5"
          />
        </div>
      </div>
    </div>
  );
};

export default SliderGsap;
