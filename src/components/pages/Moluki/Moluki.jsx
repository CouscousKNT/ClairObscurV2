"use client";
import "./sample-project.css";
import { useRef } from "react";
import logo from "/logo/logoNoir.svg";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export const Moluki = () => {
  const sampleProjectRef = useRef(null);

  useGSAP(
    () => {
      const imagesContainer = sampleProjectRef.current.querySelector(
        ".sp-images-container"
      );
      const progressContainer = sampleProjectRef.current.querySelector(
        ".sp-images-scroll-progress-container"
      );
      const counter = sampleProjectRef.current.querySelector(
        "#sp-images-scroll-counter"
      );

      ScrollTrigger.create({
        trigger: imagesContainer,
        start: "top bottom",
        end: () => "+=" + imagesContainer.scrollHeight,
        onUpdate: (self) => {
          const progress = Math.round(self.progress * 100);
          counter.textContent = progress;

          const containerHeight = progressContainer.offsetHeight;

          const isMobile = window.innerWidth < 1000;
          const baseDistance = window.innerHeight + containerHeight;
          const mobileMultiplier = isMobile ? 1.25 : 1;
          const moveDistance = baseDistance * mobileMultiplier;

          gsap.to(progressContainer, {
            y: -self.progress * moveDistance,
            duration: 0.1,
            ease: "none",
          });
        },
      });

      gsap.set(progressContainer, {
        position: "fixed",
        top: "100vh",
        left: "1.5rem",
        right: "1.5rem",
        width: "calc(100% - 3rem)",
      });
    },
    { scope: sampleProjectRef }
  );

  return (
    <div
      className="sample-project"
      ref={sampleProjectRef}
      style={{ backgroundColor: "white" }}
    >
      <a href="/" className="w-full flex justify-center">
        <img
          style={{ width: "128px", height: "auto", objectFit: "cover" }}
          className="relative w-6 object-cover m-4"
          src={logo}
        />
      </a>

      <div className="w-[95vw] mx-auto aspect-video rounded-2xl overflow-hidden shadow-lg">
        <iframe
          src="https://player.vimeo.com/video/1042756114?h=abcd1234&title=0&byline=0&portrait=0&like=0&share=0&watchlater=0"
          className="w-[95vw] mx-auto aspect-video rounded-2xl overflow-hidden shadow-lg"
          frameBorder="0"
          allow="fullscreen; picture-in-picture"
          allowFullScreen
          title="Vidéo Vimeo"
        ></iframe>
      </div>

      <section className="w-full h-full p-[1.5rem]">
        <div className=" w-full flex mb-[5rem]">
          <div className="sp-col sp-col-lg">
            <div className="opacity-50 font-fujiwara-bold-italic text-black text-lg">
              <p>Réalisation</p>
              <p>Tournage</p>
              <p>Post-Production</p>
            </div>
          </div>
          <div className="sp-col sp-col-sm flex justify-between">
            <div className="sp-year">
              <p className="opacity-30 font-fujiwara-regular text-black text-lg">
                2023
              </p>
            </div>

            <div className="font-fujiwara-black text-lg text-black client">
              <p>La grande échappée</p>
            </div>
          </div>
        </div>

        <div className="flex w-full">
          <div className="sp-col-lg">
            <div className="font-fujiwara-black-italic text-black">
              <h3>A propos :</h3>
            </div>
          </div>
          <div className="sp-col-sm">
            <div className="font-fujiwara-medium-italic text-black text-lg w-[75%] flex flex-col gap-[1.5rem]">
              <p>
                Dans l'éclat romantique de Paris, chaque rue résonne d'histoires
                d'amour. Alors, au détour d'un café et d'un foulard perdu,
                laissez-vous emporter par la magie des rencontres fortuites, où
                le hasard danse avec l'amour dans les ruelles de Montmartre.
              </p>
              <br />
              <p>
                "La grande échappée" est une a été imaginée et façonnée de bout
                en bout par Clair Obscur. De l’écriture du scénario au
                storyboard, du tournage dans les rues de Paris jusqu’au montage
                final, notre équipe a donné vie à cette vision romantique pour
                la marque Moluki. Chaque étape, pensée et réalisée en interne,
                reflète notre volonté d’allier exigence artistique et
                savoir-faire technique, afin de créer une œuvre publicitaire qui
                capte l’émotion et sublime l’univers de la marque.
              </p>

              <div className="sp-link">
                <div className="sp-link-wrapper"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sp-images">
        <div className="sp-images-scroll-progress-container text-black font-fujiwara-black-italic">
          <h1 id="sp-images-scroll-counter">0</h1>
          <h1>/100</h1>
        </div>
        <div className="sp-images-container">
          <div className="sp-img">
            <img src="/projects/la_grande_echappee/moluki1.webp" alt="" />
          </div>
          <div className="sp-img">
            <img src="/projects/la_grande_echappee/moluki2.webp" alt="" />
          </div>
          <div className="sp-img">
            <img src="/projects/la_grande_echappee/img7.webp" alt="" />
          </div>
          <div className="sp-img">
            <img src="/projects/la_grande_echappee/img4.webp" alt="" />
          </div>
          <div className="sp-img">
            <img src="/projects/la_grande_echappee/img8.webp" alt="" />
          </div>
          <div className="sp-img">
            <img src="/projects/la_grande_echappee/img6.webp" alt="" />
          </div>
          <div className="sp-img">
            <img src="/projects/la_grande_echappee/img11.webp" alt="" />
          </div>
          <div className="sp-img">
            <img src="/projects/la_grande_echappee/img5.webp" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Moluki;
