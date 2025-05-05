import React from "react";

export const Header = () => {
  return (
    <div className="mix-blend-difference w-full fixed flex flex-row justify-center gap-2 z-50">
      <div>
        <a href="#">[Pitch]</a>
      </div>
      <div>
        <a href="#">[Galerie]</a>
      </div>
      <div>
        <a href="#">[Credits]</a>
      </div>
      <div>
        <a href="#">[Contacts]</a>
      </div>
    </div>
  );
};

export default Header;
