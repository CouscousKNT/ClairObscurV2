export const LandingPage = () => {
  return (
    <div className="relative min-h-svh bg-black py-5 z-50">
      <section id="hero" className="relative flex justify-center">
        {/* Vidéo (utiliser des marges, pas top-*) */}
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
        <p className="absolute text-xs md:text-lg max-w-[300px] text-center md:text-left leading-[1.3] left-[calc(50%-150px)] md:left-16 bottom-[30%] md:bottom-16 font-fujiwara-medium-italic">
          Clair Obscur est une agence de production audiovisuelle dédiée à
          capturer et retransmettre à travers l'image toute la puissance des
          émotions.
        </p>
      </section>
    </div>
  );
};

export default LandingPage;
