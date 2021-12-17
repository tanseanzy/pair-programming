import React, { Component } from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Chuck Norris Joke Generator!</h1>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
