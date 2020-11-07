import { AnyAction } from "redux";
import { all, takeLatest } from "redux-saga/effects";

import * as authSaga from "./auth/auth.saga";
import { signInRoutine, signUpRoutine } from "./auth/auth.routine";

export function* rootSaga(): Generator<AnyAction> {
  yield all([
    yield takeLatest(signInRoutine.TRIGGER, authSaga.signIn),
    yield takeLatest(signUpRoutine.TRIGGER, authSaga.signUp),
  ]);
}
