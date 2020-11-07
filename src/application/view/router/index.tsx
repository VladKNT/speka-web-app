import React, { FC } from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";

import { SignInPage } from "../pages/SignInPage";
import { SignUnPage } from "../pages/SignUpPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export const Router: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={SignInPage} />
        <Route exact path="/registration" component={SignUnPage} />

        <Route exact path="/404" component={NotFoundPage} />
        <Redirect to="/404" />
      </Switch>
    </BrowserRouter>
  );
};
