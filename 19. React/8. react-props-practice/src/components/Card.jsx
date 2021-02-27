import React from "react";
import Avatar from "./Avatar";
import Detail from "./Detail";
function Card(props) {
  return (
    <div className="card">
      <div className="top">
        <span className="card-id">{props.contId}.</span>
        <h2 className="name">{props.name}</h2>
        <Avatar imageURL={props.imageURL} />
      </div>
      <div className="bottom">
        <Detail detailInfo={props.phone} />
        <Detail detailInfo={props.email} />
      </div>
    </div>
  );
}
export default Card;
