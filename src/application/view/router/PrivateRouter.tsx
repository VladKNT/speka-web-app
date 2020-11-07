import React, { Component, ReactNode } from "react";
import { Redirect, Route } from "react-router-dom";

import { NotFoundPage } from "../pages/NotFoundPage";

export class PrivateRouter extends Component{
  render(): ReactNode {
    return (
      <>
        <Route exact path="/404" component={NotFoundPage} />
        <Redirect to="/404" />
      </>
    );
  }
}
