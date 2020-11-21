import { put, select, cancel } from "redux-saga/effects";

import { IRootReducer } from "../root.reducer";
import { getStaffRoutine } from "./organization.routine";
import { OrganizationService } from "../../../services/api/OrganizationService";

const OrganizationApi = new OrganizationService();

export function* getStaff() {
  try {
    yield put(getStaffRoutine.request());

    const currentUser = yield select((state: IRootReducer) => state.userReducer.currentUser);

    if (!currentUser) {
      cancel();
    }

    const { id } = currentUser.organization;
    const staff = yield OrganizationApi.getStaff(id);

    yield put(getStaffRoutine.success({ staff }));
  } catch (error) {
    yield put(getStaffRoutine.failure({ error: error.message }));
  } finally {
    yield put(getStaffRoutine.fulfill());
  }
}
