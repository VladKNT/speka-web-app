import React, { Component, ReactNode } from "react";
import { Provider } from "react-redux";

import { Router } from "./router";
import { configureStore } from "../data/store";

const store = configureStore();

export class App extends Component {
  render(): ReactNode {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
