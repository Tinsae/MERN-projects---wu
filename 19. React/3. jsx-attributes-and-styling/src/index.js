import React from "react";
import ReactDOM from "react-dom";

const img = "https://picsum.photos/200";
ReactDOM.render(
  <div>
    <h1 className="heading"> Favourite Foods</h1>
    <img alt="random" src={img + "?grayscale"} />
    <div>
      <img
        className="food-items"
        alt="beyantetu"
        src="https://i.pinimg.com/originals/8a/61/d2/8a61d2da682bd6d83e042a5bf6bf33ce.jpg"
      />
      <img
        className="food-items"
        alt="avocadosmootie"
        src="https://i2.wp.com/greenhealthycooking.com/wp-content/uploads/2017/09/Avocado-Spinach-Smoothie-Image.jpg"
      />
      <img
        className="food-items"
        alt="goulash"
        src="https://i.ytimg.com/vi/6eTfGLA_Q5Q/maxresdefault.jpg"
      />
    </div>
  </div>,
  document.getElementById("root")
);
