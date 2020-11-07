import React, { Component, ReactNode } from "react";

import classNames from "classnames";

import "./Container.style.scss";

export interface IContainerOwnProps {
  className?: string;
}

export interface IContainerInjectedProps {}
export interface IContainerProps extends IContainerOwnProps, IContainerInjectedProps {}

class Container extends Component<IContainerProps> {
  render(): ReactNode {
    const { children, className } = this.props;
    const classes = classNames("b-container", className);

    return (
      <div className={classes}>
        {children}
      </div>
    );
  }
}

export default Container;
