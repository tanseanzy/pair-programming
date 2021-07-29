import React from "react";
import "./JokeDetails.scss";

function JokeDetails({currentJoke}) {
  // console.log(props);
  // const joke = props.currentJoke;
  // console.log(currentJoke);
  return (
    <div className="jokeContainer">
      {currentJoke && <p>{currentJoke.value.joke}</p>}
    </div>
  );
}

export default JokeDetails;
