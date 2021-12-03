import React from "react";
import "./JokeDetails.scss";
import chuckNorrisImage from "../../assets/images/chuck-norris.png";

function JokeDetails({ currentJoke }) {
  return (
    <div className="container">
      <img
        className="container__image"
        src={chuckNorrisImage}
        alt="Chuck Norris Image"
      />
      {currentJoke && (
        <p className="container__text">{currentJoke.value.joke}</p>
      )}
    </div>
  );
}

export default JokeDetails;
