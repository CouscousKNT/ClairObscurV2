import BlurFadeTextAnimation from "../textAnimations/BlurFadeTextAnimation";

export const LandingPage = () => {
  return (
    <div className="relative min-h-svh bg-black py-5 z-50">
      <section id="hero" className="relative flex justify-center">
        <video
          className="
          w-screen  
          md:w-[98vw]
            h-screen
            rounded-2xl object-cover
            
          "
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/LandingVideoCompressed.mp4" type="video/mp4" />
          <source src="/videos/LandingVideo.webm" type="video/webm" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
        <div className="absolute inset-0 flex items-center px-5 sm:px-10 lg:px-20 mix-blend-difference">
          <h1 className="relative top-16 text-white font-fujiwara-light-italic text-5xl lg:text-7xl xl:text-8xl w-full lg:w-1/2 leading-[0.85]">
            <span className="block text-3xl lg:text-5xl xl:text-6xl">
              <BlurFadeTextAnimation
                text="Nous transformons"
                color="white"
                charDelay={50}
                duration={600}
              />
            </span>
            <span className="block font-fujiwara-bold-italic opacity-60">
              <BlurFadeTextAnimation
                text="l'utopie en réalité."
                color="white"
                className="leading-[1]"
                charDelay={70}
                duration={1120}
              />
            </span>
          </h1>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
