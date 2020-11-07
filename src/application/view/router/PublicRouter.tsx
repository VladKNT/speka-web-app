import React, { Component, ReactNode } from "react";
import { Redirect, Route } from "react-router-dom";

import { SignInPage } from "../pages/SignInPage";
import { SignUnPage } from "../pages/SignUpPage";

export class PublicRouter extends Component{
  render(): ReactNode {
    return (
      <>
        <Route exact path="/login" component={SignInPage} />
        <Route exact path="/registration" component={SignUnPage} />

        <Redirect to="/login" />
      </>
    );
  }
}
