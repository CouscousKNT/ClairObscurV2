import React from "react";
import "../index.css";

export const HeroSection = () => {
  document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const loadingScreen = document.querySelector(".loading-screen");
    const loadingBar = document.querySelector(".loading-bar");
    const loadingLogo = document.querySelector(".loading-logo");
    const entryScreen = document.querySelector(".entry-screen");
    const entryTitle = document.querySelector(".entry-title");
    const enterButton = document.querySelector(".enter-button");
    const videoTransition = document.querySelector(".video-transition");
    const video = document.querySelector(".video-container");
    const mainContent = document.querySelector(".main-content");

    // Initial loading animation
    const tlLoading = gsap.timeline();

    // Logo animation
    tlLoading
      .to(loadingLogo, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      })
      .to(
        loadingLogo,
        {
          rotation: 360,
          duration: 2,
          ease: "power1.inOut",
        },
        0
      );

    // Loading bar animation (simulating load)
    tlLoading.to(
      loadingBar,
      {
        width: "100%",
        duration: 3,
        ease: "power1.inOut",
        onComplete: showEntryScreen,
      },
      0.5
    );

    function showEntryScreen() {
      // Hide loading screen
      gsap.to(loadingScreen, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => (loadingScreen.style.display = "none"),
      });

      // Show entry screen
      gsap.to(entryScreen, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        pointerEvents: "all",
      });

      // Animate entry elements
      gsap.to(entryTitle, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.5,
      });

      gsap.to(enterButton, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.8,
      });
    }

    // Enter button click handler
    enterButton.addEventListener("click", () => {
      // Fade out entry screen
      gsap.to(entryScreen, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        pointerEvents: "none",
      });

      // Show video transition
      gsap.to(videoTransition, {
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        onStart: () => {
          video.play();
          gsap.to(video, {
            opacity: 1,
            duration: 1.5,
          });
        },
        onComplete: showMainContent,
      });
    });

    function showMainContent() {
      // Hide video transition
      gsap.to(videoTransition, {
        opacity: 0,
        duration: 1.5,
        delay: 1,
        ease: "power2.inOut",
      });

      // Show main content
      gsap.to(mainContent, {
        opacity: 1,
        duration: 2,
        delay: 1.5,
        ease: "power2.out",
        pointerEvents: "all",
        onStart: () => {
          // Main content animations
          gsap.from(".main-title", {
            y: 50,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out",
          });

          gsap.from(".main-subtitle", {
            y: 50,
            opacity: 0,
            duration: 1.5,
            delay: 0.3,
            ease: "power3.out",
          });
        },
      });
    }

    // Preload video (important for smooth transition)
    video.load();
  });
  return (
    <div className="h-screen bg-red-800 z-10">
      <div class="loading-screen">
        <svg
          class="loading-logo"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 10 L90 50 L50 90 L10 50 Z"
            fill="none"
            stroke="white"
            stroke-width="2"
          />
        </svg>
        <div class="loading-bar-container">
          <div class="loading-bar"></div>
        </div>
      </div>

      <div class="entry-screen">
        <h1 class="entry-title">Welcome</h1>
        <button class="enter-button">Enter</button>
      </div>

      <div class="video-transition">
        <video class="video-container" muted loop></video>
      </div>

      <div class="main-content">
        <h1 class="main-title">Experience</h1>
        <p class="main-subtitle">Premium Quality</p>
      </div>
    </div>
  );
};

export default HeroSection;
