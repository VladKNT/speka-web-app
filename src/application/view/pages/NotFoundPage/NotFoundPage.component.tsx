import React, { Component, ReactNode } from "react"

export interface INotFoundPageOwnProps {}
export interface INotFoundPageInjectedProps {}
export interface INotFoundPageProps extends INotFoundPageOwnProps, INotFoundPageInjectedProps {}

class NotFoundPage extends Component<INotFoundPageProps> {
  render(): ReactNode {
    return (
      <div>
        Not Found
      </div>
    );
  }
}

export default NotFoundPage;
