import React from "react";
import img1 from "/images/projects/heritage/img1.png";
import item from "/logo/item.svg";
import whiteItem from "/logo/itemBlanc.svg";
import brandImg from "/images/brandIcon2.png";
import shopImg from "/images/shopIcon.png";
import test from "/images/test2.png";

export const OfferSection = () => {
  return (
    <div className="relative py-24 w-full">
      <section className="relative offer-section h-auto my-12 px-4 z-10 text-black flex flex-col gap-8">
        <div className="relative shop-offer h-auto xl:h-1/2 flex flex-col bg-[#e2e2e2] text-white rounded-lg z-10 overflow-hidden">
          <div className="offer-content flex flex-row-reverse">
            <div className="z-10 mix-blend-difference offer-infos w-full 2xl:w-4/6 flex flex-col gap-8 p-6 md:px-12 md:py-8">
              <div className="offer-header font-fujiwara-bold h-2 md:h-8 lg:h-12">
                <div className="offer-tags flex flex-wrap justify-end 2xl:justify-start gap-2 text-[clamp(0.4rem,2vw,4rem)] md:text-sm uppercase tracking-wide whitespace-nowrap">
                  <span className="border border-white px-4 py-1 rounded-xl hover:bg-white hover:text-black transition-colors">
                    Vidéo
                  </span>
                  <span className="border border-white px-4 py-1 rounded-xl hover:bg-white hover:text-black transition-colors">
                    Photo
                  </span>
                  <span className="border border-white px-4 py-1 rounded-xl hover:bg-white hover:text-black transition-colors">
                    Design Graphique
                  </span>
                </div>
              </div>
              <div className="offer-text w-full flex justify-end 2xl:justify-between gap-8 ">
                <h2 className="offer-title text-[clamp(0.8rem,8vw,4rem)] md:text-7xl lg:text-8xl 3xl:text-9xl racking-tighter font-fujiwara-black-italic">
                  COMMERCE
                </h2>
                <p className="offer-description hidden 2xl:block w-1/4 text-lg md:text-xl text-start font-fujiwara-bold-italic">
                  Nous donnons à vos espaces commerciaux leurs plus belles
                  lumières.
                </p>
              </div>
              <div className="offer-details uppercase flex flex-col gap-2 font-fujiwara-medium-italic text-[clamp(0.6rem,2vw,4rem)] md:text-base tracking-wide">
                <div className="offer-benefits w-full border-b border-white/30 flex justify-end 2xl:justify-start items-center pb-2 gap-2 md:gap-6">
                  <p>Photo produits</p>
                  <img
                    src={item}
                    alt="Clair Obscur"
                    className="h-3 w-3 md:w-4 md:h-4"
                  />
                  <p>Vidéo produits</p>
                  <img
                    src={item}
                    alt="Clair Obscur"
                    className="h-3 w-3 md:w-4 md:h-4"
                  />
                  <p>Evénements</p>
                </div>
                <div className="offer-benefits w-full border-b border-white/30 flex justify-end 2xl:justify-start items-center pb-2 gap-2 md:gap-6">
                  <p>Création d'identité</p>
                  <img
                    src={item}
                    alt="Clair Obscur"
                    className="h-3 w-3 md:w-4 md:h-4"
                  />
                  <p>Refonte d'identité</p>
                </div>
              </div>
            </div>
            <div className="offer-icon absolute w-2/3 h-full left-0 2xl:w-1/3 2xl:h-full 2xl:static overflow-hidden rounded-r-lg">
              <img
                src={shopImg}
                alt="Clair Obscur"
                className="w-full h-full object-right object-cover"
              />
            </div>
          </div>
        </div>

        {/* 1. J'ai retiré le mix-blend-difference de ce parent */}
        <div className="relative shadow-2xl brand-offer h-auto xl:h-1/2 flex flex-col bg-black text-white rounded-lg z-10 overflow-hidden">
          <div className="offer-content flex relative">
            {/* L'IMAGE EN ARRIÈRE-PLAN */}
            <div className="offer-icon absolute w-3/4 max-w-[500px] h-full right-0 2xl:w-1/3 2xl:h-full 2xl:block overflow-hidden rounded-r-lg">
              <img
                src={test}
                alt="Clair Obscur"
                className="w-full h-full object-left object-cover"
              />
            </div>

            {/* 2. LE TEXTE AU PREMIER PLAN AVEC MIX-BLEND-DIFFERENCE */}
            {/* Le texte, les bordures et les icônes vont maintenant s'inverser au contact de l'image */}
            <div className="offer-infos relative mix-blend-difference w-full 2xl:w-4/6 flex flex-col gap-8 p-6 md:px-12 md:py-8 pointer-events-none text-white">
              <div className="offer-header font-fujiwara-bold h-8 lg:h-12 pointer-events-auto">
                <div className="offer-tags flex flex-wrap gap-2 text-[clamp(0.4rem,2vw,4rem)] md:text-sm uppercase tracking-wide whitespace-nowrap">
                  <span className="border border-white px-4 py-1 rounded-xl hover:bg-white hover:text-black transition-colors cursor-pointer">
                    Vidéo
                  </span>
                  <span className="border border-white px-4 py-1 rounded-xl hover:bg-white hover:text-black transition-colors cursor-pointer">
                    Photo
                  </span>
                  <span className="border border-white px-4 py-1 rounded-xl hover:bg-white hover:text-black transition-colors cursor-pointer">
                    Design Graphique
                  </span>
                  <span className="border border-white px-4 py-1 rounded-xl hover:bg-white hover:text-black transition-colors cursor-pointer">
                    Consulting
                  </span>
                  <span className="border border-white px-4 py-1 rounded-xl hover:bg-white hover:text-black transition-colors cursor-pointer">
                    Web
                  </span>
                </div>
              </div>

              <div className="offer-text w-full flex gap-8 justify-between pointer-events-auto">
                <h2 className="offer-title text-[clamp(0.8rem,8vw,4rem)] md:text-7xl lg:text-8xl 3xl:text-9xl tracking-tighter font-fujiwara-black-italic">
                  MARQUE
                </h2>
                {/* Plus besoin de mix-blend ici, le parent s'en charge pour tout le monde */}
                <p className="offer-description hidden 2xl:block w-1/4 text-lg md:text-xl text-end font-fujiwara-bold-italic">
                  Nous sculptons l'image de votre marque à travers une
                  réalisation visuelle sur-mesure.
                </p>
              </div>

              <div className="offer-details uppercase flex flex-col gap-2 font-fujiwara-medium-italic text-[clamp(0.6rem,2vw,4rem)] md:text-base tracking-wide pointer-events-auto">
                <div className="offer-benefits w-full border-b border-white/30 flex items-center pb-2 gap-2 md:gap-6">
                  <p>Photo / Vidéo produits</p>
                  <img
                    src={whiteItem}
                    alt="Clair Obscur"
                    className="w-3 h-3 md:w-4 md:h-4"
                  />
                  <p>Publicité</p>
                  <img
                    src={whiteItem}
                    alt="Clair Obscur"
                    className="w-3 h-3 md:w-4 md:h-4"
                  />
                  <p>Interview</p>
                </div>
                <div className="offer-benefits w-full border-b border-white/30 flex items-center pb-2 gap-2 md:gap-6">
                  <p>Création / Refonte d'identité</p>
                  <img
                    src={whiteItem}
                    alt="Clair Obscur"
                    className="w-3 h-3 md:w-4 md:h-4"
                  />
                  <p>Evénements</p>
                </div>
                <div className="offer-benefits w-full border-b border-white/30 flex items-center pb-2 gap-2 md:gap-6">
                  <p>Audit</p>
                  <img
                    src={whiteItem}
                    alt="Clair Obscur"
                    className="w-3 h-3 md:w-4 md:h-4"
                  />
                  <p>SEO</p>
                  <img
                    src={whiteItem}
                    alt="Clair Obscur"
                    className="w-3 h-3 md:w-4 md:h-4"
                  />
                  <p>Création / Refonte de site</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="absolute w-full h-full inset-0 z-0 ">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center opacity-80 blur-sm "
        >
          <source src="/videos/contact_animated_bg.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="z-50 absolute w-full h-56 bottom-0 bg-black backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_top,black_0%,transparent_100%)] [mask-image:linear-gradient(to_top,black_0%,transparent_100%)] pointer-events-none"></div>
    </div>
  );
};

export default OfferSection;
