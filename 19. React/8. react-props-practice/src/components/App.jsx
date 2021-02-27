import React from "react";
import contacts from "../contacts.js";
import Card from "./Card";
import Avatar from "./Avatar";

function createCard(aContact, index) {
  return (
    <Card
      key={aContact.id}
      contId={aContact.id}
      name={aContact.name}
      imageURL={aContact.imgURL}
      phone={aContact.phone}
      email={aContact.email}
    />
  );
}

function App() {
  return (
    <div>
      <h1 className="heading">My Contacts</h1>
      <Avatar imageURL="https://miro.medium.com/max/3150/1*8OkdLpw_7VokmSrzwXLnbg.jpeg" />
      {contacts.map(createCard)}
    </div>
  );
}

export default App;
