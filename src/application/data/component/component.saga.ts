import { put } from "redux-saga/effects";

import { createComponentRoutine } from "./component.routine";
import { ComponentService } from "../../../services/api/ComponentService";

const ComponentApi = new ComponentService();

export function* createComponent(action: ReturnType<typeof createComponentRoutine.trigger>) {
  try {
    yield put(createComponentRoutine.request());

    const { callback, ...createComponentDto } = action.payload;
    const component = yield ComponentApi.createProject(createComponentDto);

    yield put(createComponentRoutine.success({ component }));
    callback();
  } catch (error) {
    yield put(createComponentRoutine.failure({ error: error.message }));
  } finally {
    yield put(createComponentRoutine.fulfill());
  }
}
