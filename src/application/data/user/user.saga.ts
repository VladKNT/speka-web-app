import { put } from "redux-saga/effects";

import { getCurrentUserRoutine } from "./user.routine";
import { UserService } from "../../../services/api/UserService";

const UserApi = new UserService();

export function* getCurrentUser() {
  try {
    yield put(getCurrentUserRoutine.request());
    const user = yield UserApi.getCurrentUser();
    yield put(getCurrentUserRoutine.success({ user }));
  } catch (error) {
    yield put(getCurrentUserRoutine.failure({ error: error.message }));
  } finally {
    yield put(getCurrentUserRoutine.fulfill());
  }
}
