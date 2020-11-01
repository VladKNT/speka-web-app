import { createRoutine } from "redux-saga-routines";

import {
  ISignInErrorPayload,
  ISignInTriggerPayload,
} from "../../../resources/types/auth.type";

export const signInRoutine = createRoutine("SIGN_IN", {
  failure: (payload: ISignInErrorPayload) => (payload),
  trigger: (payload: ISignInTriggerPayload) => (payload),
});

export const signUpRoutine = createRoutine("SIGN_UP");
