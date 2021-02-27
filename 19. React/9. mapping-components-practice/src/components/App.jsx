import React from "react";
import Entry from "./Entry";
import emojipedia from "../emojipedia.js";

function createTerm(anEmoji) {
  return (
    <Entry
      key={anEmoji.id}
      emoji={anEmoji.emoji}
      name={anEmoji.name}
      meaning={anEmoji.meaning}
    />
  );
}

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>
      <dl className="dictionary">{emojipedia.map(createTerm)}</dl>
    </div>
  );
}

export default App;
