import React from "react";
import logo from "/logo.svg";

const Loading = () => {
  return (
    <div className="h-screen w-screen absolute bg-white flex jusitify-center items-center content-center">
      <div className="w-50 h-auto mix-blend-difference object-cover">
        <img className="" src={logo} alt="" />
      </div>
    </div>
  );
};

export default Loading;
