import React, { Component, ReactNode } from "react";
import { Switch, BrowserRouter } from "react-router-dom";

// @ts-ignore
import { cookies, subscribe, unsubscribe } from "brownies";

import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";

interface IRouterState {
  isAuthenticated: boolean | null;
}

export class Router extends Component<unknown, IRouterState> {
  constructor(props: unknown) {
    super(props);

    this.state = {
      isAuthenticated: null,
    }
  }

  componentDidMount(): void {
    const { accessToken } = cookies;
    this.onCheckAccessToken(accessToken);

    subscribe(cookies, "accessToken", this.onCheckAccessToken);
  }

  componentWillUnmount(): void {
    unsubscribe(this.onCheckAccessToken);
  }

  onCheckAccessToken = (accessToken?: string): void => {
    const isAuthenticated = Boolean(accessToken);
    this.setState({ isAuthenticated });
  }

  render(): ReactNode {
    const { isAuthenticated } = this.state;

    if (isAuthenticated === null) {
      return null;
    }

    return (
      <BrowserRouter>
        <Switch>
          {isAuthenticated ? <PrivateRouter /> : <PublicRouter />}
        </Switch>
      </BrowserRouter>
    );
  }
}
