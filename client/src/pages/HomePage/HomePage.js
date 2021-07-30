import React, { Component } from "react";
import "./HomePage.scss";
import axios from "axios";

import JokeDetails from "../../components/JokeDetails/JokeDetails";
import JokeButton from "../../components/JokeButton/JokeButton";

class HomePage extends Component {
  state = {
    currentJoke: null,
  };

  componentDidMount() {
    axios
      .get(
        `http://api.icndb.com/jokes/random?limitTo=%5Bnerdy%5D&escape=javascript`
      )
      .then((response) => {
        this.setState({ currentJoke: response.data });
        console.log(response.data);
      })
      //   console.log(response.data);
      //   return response.data;
      // })

      .catch((error) => {
        console.log(error);
      });
  }

  updateJoke = () => {
    axios
      .get(
        `http://api.icndb.com/jokes/random?limitTo=%5Bnerdy%5D&escape=javascript`
      )
      .then((response) => {
        this.setState({ currentJoke: response.data });
        console.log(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.updateJoke();
    }
  }

  render() {
    return (
      <div className="container">
        <div className="container__details">
          <JokeDetails currentJoke={this.state.currentJoke} />
        </div>
        <JokeButton getNewJoke={this.updateJoke} />
      </div>
    );
  }
}

export default HomePage;
