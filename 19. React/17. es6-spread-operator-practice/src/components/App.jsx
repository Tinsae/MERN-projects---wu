import React, { useState } from "react";

function App() {
  let [bundle, setBundle] = useState({
    currItem: "",
    items: []
  });

  function handleChange(event) {
    let currItem = event.target.value;
    setBundle({ ...bundle, currItem: currItem });
  }
  function handleClick(event) {
    bundle.currItem && bundle.items.push(bundle.currItem);
    setBundle({ ...bundle, currItem: "" });
  }
  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} type="text" value={bundle.currItem} />
        <button>
          <span onClick={handleClick}>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {bundle.items.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
