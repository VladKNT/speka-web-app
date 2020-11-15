import React, { PureComponent, ReactNode } from "react";

import classNames from "classnames";

export interface IPrimaryButtonOwnProps {
  text: string;
}

export interface IPrimaryButtonInjectedProps extends
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export interface IPrimaryButtonProps extends IPrimaryButtonOwnProps, IPrimaryButtonInjectedProps {}

import "./PrimaryButton.style.scss";

class PrimaryButton extends PureComponent<IPrimaryButtonProps> {
  render(): ReactNode {
    const { text, className, ...otherButtonProps } = this.props;
    const classes = classNames("b-primary-button", className);

    return (
      <button className={classes} {...otherButtonProps}>
        <div className={"primary-button-label"}>
          {text.toUpperCase()}
        </div>
      </button>
    );
  }
}

export default PrimaryButton;
