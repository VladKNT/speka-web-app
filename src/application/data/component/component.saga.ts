import { put, select } from "redux-saga/effects";

import { IRootReducer } from "../root.reducer";
import { IComponent } from "../../../resources/types/component.type";
import { ComponentService } from "../../../services/api/ComponentService";

import {
  getComponentRoutine,
  editComponentRoutine,
  createComponentRoutine,
  createComponentDetailsRoutine,
  getComponentDetailsByVersionRoutine,
} from "./component.routine";

const ComponentApi = new ComponentService();

export function* createComponent(action: ReturnType<typeof createComponentRoutine.trigger>) {
  try {
    yield put(createComponentRoutine.request());

    const { callback, ...createComponentDto } = action.payload;
    const component = yield ComponentApi.createComponent(createComponentDto);

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
    const componentWithDetails = yield ComponentApi.getComponentWithDetails(id);

    yield put(getComponentRoutine.success(componentWithDetails));
  } catch (error) {
    yield put(getComponentRoutine.failure({ error: error.message }));
  } finally {
    yield put(getComponentRoutine.fulfill());
  }
}

export function* editComponent(action: ReturnType<typeof editComponentRoutine.trigger>) {
  try {
    yield put(editComponentRoutine.request());
    const selectedComponent = yield select((state: IRootReducer) => state.componentReducer.component);

    yield ComponentApi.editComponent(action.payload);

    const component: IComponent = {
      ...selectedComponent,
      ...action.payload,
      updatedAt: String(new Date()),
    }

    yield put(editComponentRoutine.success({ component }));
  } catch (error) {
    yield put(editComponentRoutine.failure({ error: error.message }));
  } finally {
    yield put(editComponentRoutine.fulfill());
  }
}

export function* createComponentDetails(action: ReturnType<typeof createComponentDetailsRoutine.trigger>) {
  try {
    yield put(createComponentDetailsRoutine.request());

    const { id, ...createComponentDetailsDto } = action.payload;
    const componentDetails = yield ComponentApi.createComponentDetails(id, createComponentDetailsDto);

    yield put(createComponentDetailsRoutine.success({ componentDetails }));
  } catch (error) {
    yield put(createComponentDetailsRoutine.failure({ error: error.message }));
  } finally {
    yield put(createComponentDetailsRoutine.fulfill());
  }
}

export function* getComponentDetailsByVersion(action: ReturnType<typeof getComponentDetailsByVersionRoutine.trigger>) {
  try {
    yield put(getComponentDetailsByVersionRoutine.request());

    const { id, version } = action.payload;
    const componentDetails = yield ComponentApi.getComponentDetailsByVersion(id, version);

    yield put(getComponentDetailsByVersionRoutine.success({ componentDetails }));
  } catch (error) {
    yield put(getComponentDetailsByVersionRoutine.failure({ error: error.message }));
  } finally {
    yield put(getComponentDetailsByVersionRoutine.fulfill());
  }
}
