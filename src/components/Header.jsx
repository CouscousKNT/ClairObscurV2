import React from "react";

export const Header = () => {
  return (
    <div className="font-fujiwara-bold mix-blend-difference w-auto fixed flex flex-row justify-center gap-2 z-100 right-0 p-5">
      <div>
        <a href="#pitch">[Pitch]</a>
      </div>
      <div>
        <a href="#gallerie">[Galerie]</a>
      </div>
      <div>
        <a href="#members">[Credits]</a>
      </div>
      <div>
        <a href="#">[Contacts]</a>
      </div>
    </div>
  );
};

export default Header;
