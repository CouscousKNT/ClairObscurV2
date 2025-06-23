import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import React, { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

export const LettersTextAnimation = ({
  triggerStart,
  triggerEnd,
  start,
  end,
  stagger,
  duration,
  text,
  className,
}) => {
  const textRef = useRef(null);
  const split = useRef(null);

  // ANIMATION DU TEXTE "SCROLLEZ VERS LE BAS" LORSQU'ON ATTEINT LA SECTION MEMBRE
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!textRef.current) return;
      // Découpe le texte en lettres grâce à SplitText de GSAP
      split.current = new SplitText(textRef.current, {
        type: "chars",
      });

      const chars = split.current.chars;

      // Animation d'apparition du texte "Scrollez vers le bas"
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 20,
        },
        {
          scrollTrigger: {
            trigger: triggerStart,
            start: start,
            end: end,
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          y: 0,
          stagger: stagger,
          ease: "power2.out",
          duration: duration,
        }
      );
      // Animation de disparition du texte "Scrollez vers le bas"
      gsap.fromTo(
        chars,
        {
          opacity: 1,
          y: 0,
        },
        {
          scrollTrigger: {
            trigger: triggerEnd,
            start: "top center",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
          opacity: 0,
          y: -20,
          stagger: stagger,
          ease: "power2.in",
          duration: duration,
        }
      );
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timeout);
      if (split.current) split.current.revert();
    };
  }, []);
  return (
    <div>
      {" "}
      <p ref={textRef} className={className}>
        {text}
      </p>
    </div>
  );
};

export default LettersTextAnimation;
