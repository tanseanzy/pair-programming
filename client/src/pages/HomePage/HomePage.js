import React, { Component } from "react";
import "./HomePage.scss";
import axios from "axios";

import JokeDetails from "../../components/JokeDetails/JokeDetails";

class HomePage extends Component {
  state = {
    currentJoke: null,
  };

  componentDidMount() {
    axios
      .get(`http://api.icndb.com/jokes/random`)
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

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      axios
        .get(`http://api.icndb.com/jokes/random`)
        .then((response) => {
          this.setState({ currentJoke: response.data });
          console.log(response.data);
        })

        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div>
        <h1>Chuck Norris Joke Generator!</h1>
        <JokeDetails currentJoke={this.state.currentJoke} />
      </div>
    );
  }
}

export default HomePage;
