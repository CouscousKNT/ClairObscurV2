import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useState } from "react";
import "../App.css";

export const Gallery = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isMobileView = window.innerWidth <= 900;
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const rows = document.querySelectorAll(".row");
    const isMobileView = window.innerWidth <= 900;

    const getStartX = (index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      return direction * (isMobileView ? 150 : 300);
    };

    if (rows.length > 0) {
      rows.forEach((row, index) => {
        const existingTrigger = ScrollTrigger.getAll().find(
          (st) => st.trigger === ".gallery" && st.vars?.targets === row
        );
        if (existingTrigger) {
          existingTrigger.kill();
        }

        const startX = getStartX(index);

        gsap.set(row, { x: startX });

        gsap.to(row, {
          scrollTrigger: {
            trigger: ".gallery",
            start: "top bottom",
            end: "bottom top",
            scrub: isMobileView ? 0.5 : 1,
            onUpdate: (self) => {
              const moveAmount = startX * (1 - self.progress);
              gsap.set(row, {
                x: moveAmount,
              });
            },
          },
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]);
  return (
    <section className="gallery">
      <div className="gallery-wrapper">
        <div className="row">
          <div className="img">
            <img src="/marquee/img1.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/marquee/img2.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/marquee/img3.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/marquee/img4.jpg" alt="" />
          </div>
        </div>
        <div className="row">
          <div className="img">
            <img src="/marquee/img5.png" alt="" />
          </div>
          <div className="img">
            <img src="/marquee/img6.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/marquee/img7.png" alt="" />
          </div>
          <div className="img">
            <img src="/marquee/img8.jpg" alt="" />
          </div>
        </div>
        <div className="row">
          <div className="img">
            <img src="/marquee/img9.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/marquee/img10.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/marquee/img11.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/marquee/img12.jpg" alt="" />
          </div>
        </div>
        <div className="row">
          <div className="img">
            <img src="/marquee/img13.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/marquee/img14.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/marquee/img15.jpg" alt="" />
          </div>
          <div className="img">
            <img src="/marquee/img16.jpg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
