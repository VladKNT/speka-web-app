import { AnyAction } from "redux";
import { all, takeLatest } from "redux-saga/effects";

import * as userSaga from "./user/user.saga";
import * as authSaga from "./auth/auth.saga";
import * as projectSaga from "./project/project.saga";

import { getCurrentUserRoutine } from "./user/user.routine";
import { signInRoutine, signUpRoutine } from "./auth/auth.routine";
import { editProjectRoutine, getProjectRoutine, getProjectsRoutine } from "./project/project.routine";

export function* rootSaga(): Generator<AnyAction> {
  yield all([
    yield takeLatest(signInRoutine.TRIGGER, authSaga.signIn),
    yield takeLatest(signUpRoutine.TRIGGER, authSaga.signUp),
    yield takeLatest(signUpRoutine.TRIGGER, authSaga.signUp),

    yield takeLatest(getCurrentUserRoutine.TRIGGER, userSaga.gerCurrentUser),

    yield takeLatest(getProjectRoutine.TRIGGER, projectSaga.gerProject),
    yield takeLatest(getProjectsRoutine.TRIGGER, projectSaga.gerProjects),
    yield takeLatest(editProjectRoutine.TRIGGER, projectSaga.editProject),
  ]);
}
