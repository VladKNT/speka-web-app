import React, { PureComponent, ReactNode } from "react";

export interface IContainerTitleOwnProps {
  text: string;
}

export interface IContainerTitleInjectedProps {}
export interface IContainerTitleProps extends IContainerTitleOwnProps, IContainerTitleInjectedProps {}

import "./ContainerTitle.style.scss";

class ContainerTitle extends PureComponent<IContainerTitleProps> {
  render(): ReactNode {
    const { text } = this.props;

    return <h1 className="b-container-title">{text}</h1>;
  }
}

export default ContainerTitle;
