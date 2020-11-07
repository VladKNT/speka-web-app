import React, { ChangeEvent, Component, ReactNode, MouseEvent } from "react";

import { Dispatch } from "redux";
import { connect } from "react-redux";

import { Input } from "../../components/UI/Inputs/Input";
import { IRootReducer } from "../../../data/root.reducer";
import { Card } from "../../components/UI/Containers/Card";
import { signInRoutine } from "../../../data/auth/auth.routine";
import { Container } from "../../components/UI/Containers/Container";
import { PrimaryButton } from "../../components/UI/Buttons/PrimaryButton";
import { ContainerTitle } from "../../components/UI/Titles/ContainerTitle";
import { ISignInTriggerPayload } from "../../../../resources/types/auth.type";
import { EMAIL, PASSWORD, SIGN_IN } from "../../../../resources/constants/strings";
import { ESignInPageFields } from "../../../../resources/types/fields/signInPageFields";

import "./SignInPage.style.scss";

export interface ISignInPageOwnProps {
  loading: number;
  signIn: (payload: ISignInTriggerPayload) => void;
}

export interface ISignInPageInjectedProps {}
export interface ISignInPageProps extends ISignInPageOwnProps, ISignInPageInjectedProps {}

interface ISignInPageState {
  [ESignInPageFields.EMAIL]: string;
  [ESignInPageFields.PASSWORD]: string;
}

class SignInPage extends Component<ISignInPageProps, ISignInPageState> {
  constructor(props: ISignInPageProps) {
    super(props);

    this.state = {
      [ESignInPageFields.EMAIL]: "",
      [ESignInPageFields.PASSWORD]: "",
    };
  }

  onChangeField = (field: ESignInPageFields) => (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;

    // @ts-ignore
    this.setState({ [field]: value });
  }

  onSubmit = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    const { signIn } = this.props;

    signIn(this.state);
  }

  render(): ReactNode {
    return (
      <Container className="b-sign-in-page">
        <ContainerTitle text={SIGN_IN} />

        <Card className="sign-in-card">
          <form className="sign-in-form">
            <Input
              type="email"
              placeholder={EMAIL}
              className="sign-in-input"
              onChange={this.onChangeField(ESignInPageFields.EMAIL)}
            />

            <Input
              type="password"
              placeholder={PASSWORD}
              className="sign-in-input"
              onChange={this.onChangeField(ESignInPageFields.PASSWORD)}
            />

            <PrimaryButton text={SIGN_IN} className="sign-in-button" onClick={this.onSubmit} />
          </form>
        </Card>
      </Container>
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
    signIn: (payload: ISignInTriggerPayload) => dispatch(signInRoutine.trigger(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
