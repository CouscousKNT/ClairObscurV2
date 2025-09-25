export const LandingPage = () => {
  return (
    <div className="relative min-h-svh bg-black py-5 z-50">
      <section id="hero" className="relative flex justify-center">
        {/* Titre en overlay */}
        <h1
          className="
            absolute top-24 
            font-fujiwara-black-italic 
            text-white text-center 
            leading-none whitespace-nowrap 
            text-[clamp(1.6rem,10vw,11rem)] md:text-[clamp(2rem,11vw,13rem)] 
            z-50 mix-blend-difference
          "
        >
          CLAIR OBSCUR
        </h1>

        {/* Vidéo (utiliser des marges, pas top-*) */}
        <video
          className="
            w-[90vw] max-w-[1400px] 
            md:w-[92vw] md:max-w-[1800px] 
            h-[70vh] sm:h-[80vh] 
            rounded-2xl object-cover
            mt-40 md:mt-36 lg:mt-40 2xl:mt-48
          "
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/landingvideoHD.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
      </section>
    </div>
  );
};

export default LandingPage;
