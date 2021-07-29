import React from "react";
import "./JokeDetails.scss";

function JokeDetails(props) {
  // console.log(props);
  const joke = props.currentJoke;
  console.log(joke);
  return (
    <div className="jokeContainer">
      <p>{props.value.joke}</p>
    </div>
  );
}

export default JokeDetails;
