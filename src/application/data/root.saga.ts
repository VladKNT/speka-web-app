import { AnyAction } from "redux";
import { all, takeLatest } from "redux-saga/effects";

import * as userSaga from "./user/user.saga";
import * as authSaga from "./auth/auth.saga";
import * as projectSaga from "./project/project.saga";
import * as componentSaga from "./component/component.saga";
import * as organizationSaga from "./organization/organization.saga";

import { getCurrentUserRoutine } from "./user/user.routine";
import { signInRoutine, signUpRoutine } from "./auth/auth.routine";
import { getStaffRoutine } from "./organization/organization.routine";

import {
  getProjectRoutine,
  getProjectsRoutine,
  editProjectRoutine,
  createProjectRoutine,
  getProjectComponentsRoutine,
  getProjectTeamMembersRoutine,
  assignProjectTeamMemberRoutine,
} from "./project/project.routine";

import {
  getComponentRoutine,
  editComponentRoutine,
  createComponentRoutine,
  getComponentAssigneesRoutine,
  assignComponentMemberRoutine,
  createComponentDetailsRoutine,
  getComponentDetailsByVersionRoutine,
} from "./component/component.routine";


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
    yield takeLatest(getProjectTeamMembersRoutine.TRIGGER, projectSaga.getProjectTeamMembers),
    yield takeLatest(assignProjectTeamMemberRoutine.TRIGGER, projectSaga.assignProjectTeamMember),

    yield takeLatest(getComponentRoutine.TRIGGER, componentSaga.getComponent),
    yield takeLatest(editComponentRoutine.TRIGGER, componentSaga.editComponent),
    yield takeLatest(createComponentRoutine.TRIGGER, componentSaga.createComponent),
    yield takeLatest(getComponentAssigneesRoutine.TRIGGER, componentSaga.getComponentAssignees),
    yield takeLatest(createComponentDetailsRoutine.TRIGGER, componentSaga.createComponentDetails),
    yield takeLatest(assignComponentMemberRoutine.TRIGGER, componentSaga.assignComponentTeamMember),
    yield takeLatest(getComponentDetailsByVersionRoutine.TRIGGER, componentSaga.getComponentDetailsByVersion),

    yield takeLatest(getStaffRoutine.TRIGGER, organizationSaga.getStaff),
  ]);
}
