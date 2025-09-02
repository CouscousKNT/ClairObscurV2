"use client";
import "./sample-project.css";
import { useRef } from "react";
import logo from "/logo/logoNoir.svg";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export const AuxCouleursDesTableaux = () => {
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
          src="https://player.vimeo.com/video/1042756850?h=abcd1234&title=0&byline=0&portrait=0&like=0&share=0&watchlater=0"
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
              <p>3D</p>
            </div>
          </div>
          <div className="sp-col sp-col-sm flex justify-between">
            <div>
              <p className="opacity-30 font-fujiwara-regular text-black text-lg">
                2024
              </p>
            </div>

            <div className="font-fujiwara-black text-lg text-black client">
              <p className="">Aux couleurs des tableaux</p>
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
                Parce que la vie est faite de moments de lumières et
                d’obscurités, Clair Obscur est née aujourd’hui. Avec une volonté
                forte, celle de capturer et retransmettre à travers l’image le
                prisme infini de toutes ces émotions. "Aux couleurs des
                tableaux" est le film de lancement de l'agence Clair Obscur.
              </p>
              <br />
              <p>
                Pour célébrer sa naissance, nous avons imaginé un film qui
                incarne notre identité : entre ombre et lumière, entre réel et
                imaginaire. Pensé comme une déclaration d’intention, ce
                lancement raconte la vision de l’agence : écrire, réaliser et
                sublimer des histoires visuelles capables de marquer les
                esprits. Chaque plan, chaque mouvement de caméra traduit
                l’ambition de Clair Obscur : transformer l’ordinaire en cinéma
                et offrir aux marques une expérience créative singulière.
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
            <img src="/projects/aux_couleurs_des_tableaux/img15.webp" alt="" />
          </div>
          <div className="sp-img">
            <img src="/projects/aux_couleurs_des_tableaux/img10.webp" alt="" />
          </div>
          <div className="sp-img">
            <img src="/projects/aux_couleurs_des_tableaux/img16.webp" alt="" />
          </div>
          <div className="sp-img">
            <img src="/projects/aux_couleurs_des_tableaux/img4.webp" alt="" />
          </div>
          <div className="sp-img">
            <img src="/projects/aux_couleurs_des_tableaux/img6.webp" alt="" />
          </div>
          <div className="sp-img">
            <img src="/projects/aux_couleurs_des_tableaux/img2.webp" alt="" />
          </div>
          <div className="sp-img">
            <img src="/projects/aux_couleurs_des_tableaux/img13.webp" alt="" />
          </div>
          <div className="sp-img">
            <img src="/projects/aux_couleurs_des_tableaux/img8.webp" alt="" />
          </div>
          <div className="sp-img">
            <img src="/projects/aux_couleurs_des_tableaux/img3.webp" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuxCouleursDesTableaux;
