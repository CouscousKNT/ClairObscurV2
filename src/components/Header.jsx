import React from "react";

export const Header = () => {
  const pitchSection = document.getElementById("pitchSection");
  const gallerySection = document.getElementById("galerie");
  const memberSection = document.getElementById("memberSection");
  const contact = document.getElementById("contact");

  return (
    <div className="font-fujiwara-bold w-auto fixed flex flex-row justify-center gap-2 z-[100] right-0 p-5">
      <button
        className="hover:text-xl duration-700 ease-out"
        onClick={() => {
          pitchSection.scrollIntoView({
            behavior: "smooth",
          });
        }}
      >
        [Pitch]
      </button>
      <button
        className="hover:text-xl duration-700 ease-out"
        onClick={() => {
          gallerySection.scrollIntoView({
            behavior: "smooth",
          });
        }}
      >
        [Galerie]
      </button>
      <button
        className="hover:text-xl duration-700 ease-out"
        onClick={() => {
          memberSection.scrollIntoView({
            behavior: "smooth",
          });
        }}
      >
        [Credits]
      </button>
      <button
        className="hover:text-xl duration-700 ease-out"
        onClick={() => {
          contact.scrollIntoView({
            behavior: "smooth",
          });
        }}
      >
        [Contacts]
      </button>
    </div>
  );
};

export default Header;
