import React, { Component, ReactNode } from "react";

import classNames from "classnames";

export interface ICardOwnProps {
  className?: string;
}

export interface ICardInjectedProps {}
export interface ICardProps extends ICardOwnProps, ICardInjectedProps {}

import "./Card.style.scss";

class Card extends Component<ICardProps> {
  render(): ReactNode {
    const { children, className } = this.props;
    const classes = classNames("b-card", className);

    return (
      <div className={classes}>
        {children}
      </div>
    );
  }
}

export default Card;
