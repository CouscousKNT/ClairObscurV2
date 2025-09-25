import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import FluidGradientCanvas from "../../components/FluidGradientCanvas/FluidGradientCanvas";
import logo from "/logo/logo.svg";

const Contact = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now
        .toLocaleTimeString("fr-FR", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
        .replace(/:/g, ":")
        .toUpperCase();
      setCurrentTime(timeString);
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="h-[100dvh] w-full overflow-hidden relative">
      <Header />
      <section class="absolute w-full h-full contact-page z-10 font-fujiwara-bold text-2xl">
        <div class="contact-copy absolute top-0 left-0 w-full h-full flex flex-col gap-[2rem] justify-center align-center ">
          <div class="flex items-center justify-center flex-col gap-4">
            <img
              src={logo}
              alt="Clair Obscur"
              className="h-12 lg:h-16 xl:h-20 w-auto object-contain"
            />
            <h4 className="text-sm lg:text-base uppercase">Basé à Paris</h4>
          </div>

          <div class="flex items-center justify-center flex-col">
            <h4>Email</h4>

            <h4>LinkedIn</h4>
            <h4>Instagram / Vimeo / Tiktok</h4>
          </div>

          {/* <div class="absolute bottom-0 w-full flex justify-between align-end p-1 gap-[2rem] text-base font-fujiwara-black px-5 py-5 sm:px-10 lg:px-20">
            <p>Par Ous'</p>
            <p>&copy;Clair Obscur - 2025</p>
          </div> */}
          <div className="w-full flex justify-between align-end p-1 gap-[2rem] text-sm md:text-base font-fujiwara-black px-5 py-5 sm:px-10 lg:px-20 absolute bottom-0">
            <div className="">
              <p className="sm caps mono">{currentTime}</p>
            </div>
            <div>
              <p>&copy;Clair Obscur - 2025</p>
            </div>
          </div>
        </div>
      </section>
      <div className="absolute w-full h-screen inset-0 z-0">
        <FluidGradientCanvas />
      </div>
    </div>
  );
};

export default Contact;
