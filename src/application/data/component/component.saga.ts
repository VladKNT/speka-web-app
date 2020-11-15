import { put } from "redux-saga/effects";

import { ComponentService } from "../../../services/api/ComponentService";
import { createComponentRoutine, getComponentRoutine } from "./component.routine";

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

export function* getComponent(action: ReturnType<typeof getComponentRoutine.trigger>) {
  try {
    yield put(getComponentRoutine.request());

    const { id } = action.payload;
    const componentWithDetails = yield ComponentApi.getProjectWithDetails(id);

    yield put(getComponentRoutine.success(componentWithDetails));
  } catch (error) {
    yield put(getComponentRoutine.failure({ error: error.message }));
  } finally {
    yield put(getComponentRoutine.fulfill());
  }
}
