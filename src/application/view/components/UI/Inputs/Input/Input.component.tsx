import React, { PureComponent, ReactNode } from "react";
import classNames from "classnames";

export interface IInputOwnProps {}
export interface IInputInjectedProps extends
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export interface IInputProps extends IInputOwnProps, IInputInjectedProps {}

import "./Input.style.scss";

class Input extends PureComponent<IInputProps> {
  render(): ReactNode {
    const { className, ...otherInputProps } = this.props;
    const classes = classNames("b-input", className);

    return (
      <input className={classes} {...otherInputProps} />
    );
  }
}

export default Input;
