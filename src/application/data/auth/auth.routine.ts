import { createRoutine } from "redux-saga-routines";

import {
  ISignInErrorPayload,
  ISignInTriggerPayload,

  ISignUpErrorPayload,
  ISignUpTriggerPayload,
} from "../../../resources/types/auth.type";

export const signInRoutine = createRoutine("SIGN_IN", {
  failure: (payload: ISignInErrorPayload) => (payload),
  trigger: (payload: ISignInTriggerPayload) => (payload),
});

export const signUpRoutine = createRoutine("SIGN_UP", {
  failure: (payload: ISignUpErrorPayload) => (payload),
  trigger: (payload: ISignUpTriggerPayload) => (payload),
});

export const signOutRoutine = createRoutine("SIGN_OUT");
