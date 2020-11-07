import React, { Component, ReactNode } from "react";
import classNames from "classnames";

import "./ContentWrapper.style.scss";

export interface IContentWrapperOwnProps {
  className?: string;
}

export interface IContentWrapperInjectedProps {}
export interface IContentWrapperProps extends IContentWrapperOwnProps, IContentWrapperInjectedProps {}

class ContentWrapper extends Component<IContentWrapperProps> {
  render(): ReactNode {
    const { children, className } = this.props;
    const classes = classNames("b-content-wrapper", className);

    return (
      <div className={classes}>
        {children}
      </div>
    );
  }
}

export default ContentWrapper;
