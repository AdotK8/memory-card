import React from "react";
import pokeballImage from "./assets/images/pokeball.png";

const Loading = () => {
  return (
    <div className="loading-screen">
      <img src={pokeballImage} alt="Loading" className="spinning-pokeball" />
    </div>
  );
};

export default Loading;
