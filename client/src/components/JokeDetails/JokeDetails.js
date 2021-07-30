import React from "react";
import "./JokeDetails.scss";
import chuckNorrisImage from "../../assets/images/chuck-norris.png";

function JokeDetails({ currentJoke }) {
  console.log(currentJoke);
  // const joke = props.currentJoke;
  // console.log(currentJoke);

  // function getNewJoke(e) {
  //   const jokeid = e.target.id;
  //   console.log(jokeid);
  // }

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
