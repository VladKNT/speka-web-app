import { AnyAction } from "redux";
import { all, takeLatest } from "redux-saga/effects";

import * as userSaga from "./user/user.saga";
import * as authSaga from "./auth/auth.saga";

import { getCurrentUserRoutine } from "./user/user.routine";
import { signInRoutine, signUpRoutine } from "./auth/auth.routine";

export function* rootSaga(): Generator<AnyAction> {
  yield all([
    yield takeLatest(signInRoutine.TRIGGER, authSaga.signIn),
    yield takeLatest(signUpRoutine.TRIGGER, authSaga.signUp),

    yield takeLatest(getCurrentUserRoutine.TRIGGER, userSaga.gerCurrentUser),
  ]);
}
