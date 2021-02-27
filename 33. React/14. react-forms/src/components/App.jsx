import React, { useState } from "react";

function App() {
  let [name, setName] = useState("");
  function handleChange(event) {
    setName(event.target.value);
  }
  return (
    <div className="container">
      <h1>{name} </h1>
      <input
        onChange={handleChange}
        type="text"
        placeholder="What's your name?"
        value={name}
      />
      <button>Submit</button>
    </div>
  );
}

export default App;
