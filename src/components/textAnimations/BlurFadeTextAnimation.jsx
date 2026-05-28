import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BlurFadeTextAnimation({
  text = "",
  color = "#eeeeee",
  charDelay = 100,
  duration = 500,
  stagger = 0.03,
  className = "",
  triggerStart,
  triggerEnd,
  start = "top 80%",
  end = "bottom 20%",
}) {
  const useGSAP = Boolean(triggerStart);
  const [key, setKey] = useState(0);
  const durationSec = `${duration / 1000}s`;
  const containerRef = useRef(null);

  useEffect(() => {
    if (!useGSAP || !containerRef.current) return;

    const chars = Array.from(
      containerRef.current.querySelectorAll(".blur-char"),
    );

    const gDuration =
      typeof duration === "number" && duration > 10
        ? duration / 1000
        : duration;

    const enterTl = gsap.fromTo(
      chars,
      { opacity: 0, y: 4, scale: 0.9, filter: "blur(6px)" },
      {
        scrollTrigger: {
          trigger: triggerStart,
          start,
          end,
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        stagger,
        ease: "power2.out",
        duration: gDuration,
        onComplete: () => {
          gsap.set(chars, { clearProps: "filter" });
        },
      },
    );

    let exitTl;
    if (triggerEnd) {
      exitTl = gsap.fromTo(
        chars,
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
        {
          scrollTrigger: {
            trigger: triggerEnd,
            start: "top center",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
          opacity: 0,
          y: -4,
          scale: 0.9,
          filter: "blur(6px)",
          stagger,
          ease: "power2.in",
          duration: gDuration,
        },
      );
    }

    ScrollTrigger.refresh();

    return () => {
      enterTl.scrollTrigger?.kill();
      exitTl?.scrollTrigger?.kill();
    };
  }, [useGSAP, triggerStart, triggerEnd, start, end, stagger, duration]);

  const renderText = () => {
    const words = text.split(" ");
    let charIndex = 0;

    return words.map((word, wordIndex) => {
      const isLastWord = wordIndex === words.length - 1;

      return (
        <React.Fragment key={wordIndex}>
          {/* Conteneur du mot (empêche la coupure) */}
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((char) => {
              const i = charIndex++;
              return (
                <span
                  key={i}
                  className="blur-char whitespace-pre opacity-0 inline-block"
                  style={
                    !useGSAP
                      ? {
                          animation: `blurFadeIn ${durationSec} ease-out forwards`,
                          animationDelay: `${i * charDelay}ms`,
                        }
                      : {}
                  }
                >
                  {char}
                </span>
              );
            })}
          </span>

          {!isLastWord &&
            (() => {
              const i = charIndex++;
              return (
                <span
                  key={i}
                  className="blur-char whitespace-pre opacity-0 inline-block"
                  style={
                    !useGSAP
                      ? {
                          animation: `blurFadeIn ${durationSec} ease-out forwards`,
                          animationDelay: `${i * charDelay}ms`,
                        }
                      : {}
                  }
                >
                  {" "}
                </span>
              );
            })()}
        </React.Fragment>
      );
    });
  };

  // ── Render Unifié ───────────────────────────────────────────────────────────
  return (
    <>
      {/* On injecte les styles uniquement si on n'utilise pas GSAP */}
      {!useGSAP && (
        <style>{`
          @keyframes blurFadeIn {
            from {
              opacity: 0;
              transform: translate(-2px, 4px) scale(0.9);
              filter: blur(6px);
            }
            to {
              opacity: 1;
              transform: translate(0, 0) scale(1);
              filter: blur(0);
            }
          }
        `}</style>
      )}

      <span
        ref={useGSAP ? containerRef : null}
        key={!useGSAP ? key : undefined}
        className={`flex flex-wrap select-none ${className}`}
        style={{ color }}
      >
        {renderText()}
      </span>
    </>
  );
}
