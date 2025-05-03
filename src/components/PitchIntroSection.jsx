import React from "react";

export const PitchIntroSection = () => {
  return (
    <div className="z-10 absolute h-[100vh] p-8 flex flex-col gap-12 justify-between top-[100vh] text-white">
      <div className="flex flex-col gap-4 w-auto">
        {/* <h1 className="text-[15vw] font-fujiwara">et d'obscurité.</h1> */}
      </div>
      <div className="">
        <h2 className="w-4/5 text-4xl">
          Joie, tristesse, colère... ces instants qui nous entourent façonnent
          nos plus beau souvenirs.
        </h2>
      </div>
      <div>
        <p className="bottom-0">
          Clair Obscur est une agence de production audiovisuelle dédiée à
          capturer et retransmettre à travers l'image toute la puissance des
          émotions.
        </p>
      </div>
    </div>
  );
};

export default PitchIntroSection;
