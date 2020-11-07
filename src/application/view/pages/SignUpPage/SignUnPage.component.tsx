import React, { ChangeEvent, Component, MouseEvent, ReactNode } from "react";

import { Dispatch } from "redux";
import { connect } from "react-redux";

import { Input } from "../../components/UI/Inputs/Input";
import { IRootReducer } from "../../../data/root.reducer";
import { Card } from "../../components/UI/Containers/Card";
import { signUpRoutine } from "../../../data/auth/auth.routine";
import { PrimaryButton } from "../../components/UI/Buttons/PrimaryButton";
import { ContainerTitle } from "../../components/UI/Titles/ContainerTitle";
import { ISignUpTriggerPayload } from "../../../../resources/types/auth.type";
import { ESignUpPageFields } from "../../../../resources/types/fields/signUpPageFields";

import {
  EMAIL,
  SIGN_UP,
  PASSWORD,
  LAST_NAME,
  FIRST_NAME,
  CONTACT_NUMBER,
} from "../../../../resources/constants/strings";

import "./SignUpPage.style.scss";

export interface ISignUpPageOwnProps {
  loading: number;
  signUp: (payload: ISignUpTriggerPayload) => void;
}

export interface ISignUpPageInjectedProps {}
export interface ISignUpPageProps extends ISignUpPageOwnProps, ISignUpPageInjectedProps {}

interface ISignUpPageState {
  [ESignUpPageFields.EMAIL]: string;
  [ESignUpPageFields.PASSWORD]: string;
  [ESignUpPageFields.LAST_NAME]: string;
  [ESignUpPageFields.FIRST_NAME]: string;
  [ESignUpPageFields.CONTACT_NUMBER]: string;
}

class SignUpPage extends Component<ISignUpPageProps, ISignUpPageState> {
  constructor(props: ISignUpPageProps) {
    super(props);

    this.state = {
      [ESignUpPageFields.EMAIL]: "",
      [ESignUpPageFields.PASSWORD]: "",
      [ESignUpPageFields.LAST_NAME]: "",
      [ESignUpPageFields.FIRST_NAME]: "",
      [ESignUpPageFields.CONTACT_NUMBER]: "",
    };
  }

  onChangeField = (field: ESignUpPageFields) => (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    // @ts-ignore
    this.setState({ [field]: value });
  }

  onSubmit = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    const { signUp } = this.props;
    signUp(this.state);
  }

  render(): ReactNode {
    return (
      <div className="b-sign-up-page">
        <ContainerTitle text={SIGN_UP} />

        <Card className="sign-up-card">
          <form className="sign-up-form">
            <Input
              placeholder={FIRST_NAME}
              className="sign-up-input"
              onChange={this.onChangeField(ESignUpPageFields.FIRST_NAME)}
            />

            <Input
              placeholder={LAST_NAME}
              className="sign-up-input"
              onChange={this.onChangeField(ESignUpPageFields.LAST_NAME)}
            />

            <Input
              className="sign-up-input"
              placeholder={CONTACT_NUMBER}
              onChange={this.onChangeField(ESignUpPageFields.CONTACT_NUMBER)}
            />

            <Input
              type="email"
              placeholder={EMAIL}
              className="sign-up-input"
              onChange={this.onChangeField(ESignUpPageFields.EMAIL)}
            />

            <Input
              type="password"
              placeholder={PASSWORD}
              className="sign-up-input"
              onChange={this.onChangeField(ESignUpPageFields.PASSWORD)}
            />

            <PrimaryButton text={SIGN_UP} className="sign-up-button" onClick={this.onSubmit} />
          </form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootReducer) => {
  const { loading } = state.authReducer;

  return {
    loading,
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    signUp: (payload: ISignUpTriggerPayload) => dispatch(signUpRoutine.trigger(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
