import { put, select } from "redux-saga/effects";

import { IRootReducer } from "../root.reducer";
import { IComponent } from "../../../resources/types/component.type";
import { ComponentService } from "../../../services/api/ComponentService";
import { createComponentRoutine, editComponentRoutine, getComponentRoutine } from "./component.routine";

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
