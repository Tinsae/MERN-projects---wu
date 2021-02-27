import React, { useState } from "react";

function App() {
  const [headingText, setHeadingText] = useState("Hello");
  const [buttonColor, setButtonColor] = useState("white");
  function handleClick() {
    setHeadingText("Submitted!");
  }
  function handleMouse(event) {
    buttonColor === "white" ? setButtonColor("black") : setButtonColor("white");
  }

  return (
    <div className="container">
      <h1>{headingText}</h1>
      <input type="text" placeholder="What's your name?" />
      <button
        onClick={handleClick}
        onMouseOver={handleMouse}
        onMouseOut={handleMouse}
        style={{ backgroundColor: buttonColor }}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
