import { AnyAction } from "redux";
import { all, takeLatest } from "redux-saga/effects";

import * as userSaga from "./user/user.saga";
import * as authSaga from "./auth/auth.saga";
import * as projectSaga from "./project/project.saga";

import { getCurrentUserRoutine } from "./user/user.routine";
import { signInRoutine, signUpRoutine } from "./auth/auth.routine";

import {
  getProjectRoutine,
  getProjectsRoutine,
  editProjectRoutine,
  createProjectRoutine,
  getProjectComponentsRoutine,
} from "./project/project.routine";

export function* rootSaga(): Generator<AnyAction> {
  yield all([
    yield takeLatest(signInRoutine.TRIGGER, authSaga.signIn),
    yield takeLatest(signUpRoutine.TRIGGER, authSaga.signUp),
    yield takeLatest(signUpRoutine.TRIGGER, authSaga.signUp),

    yield takeLatest(getCurrentUserRoutine.TRIGGER, userSaga.getCurrentUser),

    yield takeLatest(getProjectRoutine.TRIGGER, projectSaga.getProject),
    yield takeLatest(getProjectsRoutine.TRIGGER, projectSaga.getProjects),
    yield takeLatest(editProjectRoutine.TRIGGER, projectSaga.editProject),
    yield takeLatest(createProjectRoutine.TRIGGER, projectSaga.createProject),
    yield takeLatest(getProjectComponentsRoutine.TRIGGER, projectSaga.getProjectComponents),
  ]);
}
