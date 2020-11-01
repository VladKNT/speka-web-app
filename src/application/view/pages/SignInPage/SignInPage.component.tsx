import React, { Component, ReactNode } from "react";

import "./SignInPage.style.scss";

export interface ISignInPageOwnProps {}
export interface ISignInPageInjectedProps {}
export interface ISignInPageProps extends ISignInPageOwnProps, ISignInPageInjectedProps {}

class SignInPage extends Component<ISignInPageProps> {
  render(): ReactNode {
    return (
      <div>
        Sign in page
      </div>
    );
  }
}

export default SignInPage;
