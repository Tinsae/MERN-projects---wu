// CHALLENGE: uncomment the code below and see the car stats rendered
import React from "react";
import ReactDOM from "react-dom";
import cars from "./practice.js";

let [honda, tesla] = cars;
let [
  {
    speedStats: { topSpeed: hondaTopSpeed },
    coloursByPopularity: [hondaTopColour]
  },
  {
    speedStats: { topSpeed: teslaTopSpeed },
    coloursByPopularity: [teslaTopColour]
  }
] = cars;

ReactDOM.render(
  <table>
    <thead>
      <th>Brand</th>
      <th>Top Speed</th>
      <th>Top Colour</th>
    </thead>
    <tbody>
      <tr>
        <td>{tesla.model}</td>
        <td>{teslaTopSpeed}</td>
        <td>{teslaTopColour}</td>
      </tr>
      <tr>
        <td>{honda.model}</td>
        <td>{hondaTopSpeed}</td>
        <td>{hondaTopColour}</td>
      </tr>
    </tbody>
  </table>,
  document.getElementById("root")
);
