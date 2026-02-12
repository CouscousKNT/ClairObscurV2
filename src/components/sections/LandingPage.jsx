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
      </section>
    </div>
  );
};

export default LandingPage;
