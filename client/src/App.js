import React, { Component } from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          {/* <Header /> */}
          <Switch>
            {/* <Route exact path="/upload" component={UploadPage} /> */}
            <Route exact path="/" component={HomePage} />
            {/* <Route exact path="/:id" component={HomePage} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
