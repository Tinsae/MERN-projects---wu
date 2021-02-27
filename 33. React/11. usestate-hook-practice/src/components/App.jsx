import React, { useState } from "react";

function App() {
  let intervals = [];
  let startTime = new Date().toLocaleTimeString();
  let [currTime, setCurrTime] = useState(startTime);

  function showTime() {
    setCurrTime(new Date().toLocaleTimeString());
  }

  function stopTime() {
    console.log(intervals);
  }

  intervals.push(
    setInterval(() => {
      setCurrTime(new Date().toLocaleTimeString());
    }, 1000)
  );

  return (
    <div className="container">
      <h2>{currTime}</h2>
      <button onClick={showTime}>Get Time</button>
      <button onClick={stopTime}>Stop</button>
    </div>
  );
}

export default App;
