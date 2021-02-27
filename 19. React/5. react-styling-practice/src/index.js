//Create a React app from scratch.
//Show a single h1 that says "Good morning" if between midnight and 12PM.
//or "Good Afternoon" if between 12PM and 6PM.
//or "Good evening" if between 6PM and midnight.
//Apply the "heading" style in the styles.css
//Dynamically change the color of the h1 using inline css styles.
//Morning = red, Afternoon = green, Night = blue.

import React from "react";
import ReactDOM from "react-dom";

let greeting = "";
let headingStyle = { color: "red" };
let hour = new Date().getHours();
if (hour < 12) {
  greeting = "Good Morning";
  headingStyle.color = "red";
} else if (hour < 18) {
  greeting = "Good Afternoon";
  headingStyle.color = "green";
} else {
  greeting = "Good Evening";
  headingStyle.color = "blue";
}

ReactDOM.render(
  <div>
    <h1 className="heading" style={headingStyle}>
      {greeting}
    </h1>
  </div>,
  document.querySelector("#root")
);
