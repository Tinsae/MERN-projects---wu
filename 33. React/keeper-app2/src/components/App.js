import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notes from "../notes.js";

function App() {
  return (
    <div>
      <Header />
      {notes.map((currNote) => (
        <Note
          key={currNote.key}
          title={currNote.title}
          content={currNote.content}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
