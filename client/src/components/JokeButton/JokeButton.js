import "./JokeButton.scss";

export default function JokeButton(props) {
  return (
    <div class="wrap">
      <button onClick={props.getNewJoke} class="button">
        ACQUIRE NEW JOKE
      </button>
    </div>
  );
}
