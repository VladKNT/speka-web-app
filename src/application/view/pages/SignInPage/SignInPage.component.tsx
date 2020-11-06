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

import "./SignInPage.style.scss";

export interface ISignInPageOwnProps {
  loading: number;
  signIn: (payload: ISignInTriggerPayload) => void;
}

export interface ISignInPageInjectedProps {}
export interface ISignInPageProps extends ISignInPageOwnProps, ISignInPageInjectedProps {}

interface ISignInPageState {
  email: string;
  password: string;
}

class SignInPage extends Component<ISignInPageProps, ISignInPageState> {
  constructor(props: ISignInPageProps) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  onChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
    const email = event.target.value;
    this.setState({ email });
  }

  onChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
    const password = event.target.value;
    this.setState({ password });
  }

  onSubmit = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    const { signIn } = this.props;
    const { email, password } = this.state;

    signIn({ email, password });
  }

  render(): ReactNode {
    return (
      <Container className="b-sign-in-page">
        <ContainerTitle text={SIGN_IN} />

        <Card className="sign-in-card">
          <form className="sign-in-form">
            <Input placeholder={EMAIL} type="email" className="sign-in-input" onChange={this.onChangeEmail} />
            <Input placeholder={PASSWORD} type="password" className="sign-in-input" onChange={this.onChangePassword} />

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
