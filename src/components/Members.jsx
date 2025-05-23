import { useEffect, useRef } from "react";

export function Members() {
  const canvasRef = useRef(null);
  const frameCount = 277;
  const imagesRef = useRef([]);
  const imageLoadedRef = useRef(false);

  // Génère le chemin de l'image
  const currentFrame = (index) =>
    `/team/scrollAnimation/${index.toString().padStart(3, "0")}.jpg`;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Précharger toutes les images
    const preloadImages = () => {
      let loaded = 0;
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
          loaded++;
          if (loaded === frameCount) {
            imageLoadedRef.current = true;
          }
        };
        imagesRef.current[i] = img;
      }
    };

    // Mettre à jour l'image affichée
    const updateImage = (index) => {
      const img = imagesRef.current[index];
      if (img && imageLoadedRef.current) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    const handleScroll = () => {
      const html = document.documentElement;
      const wrap = document.querySelector(".png__sequence");
      const scrollTop = html.scrollTop;
      const maxScrollTop = wrap.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScrollTop;
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
      );
      requestAnimationFrame(() => updateImage(frameIndex));
    };

    // Init
    preloadImages();
    window.addEventListener("scroll", handleScroll);

    // Nettoyage
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="png__sequence" style={{ height: "200vh" }}>
      <canvas ref={canvasRef} className="png__sequence__canvas" />
    </div>
  );
}
