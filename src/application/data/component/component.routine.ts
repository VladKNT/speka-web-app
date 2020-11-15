import { createRoutine } from "redux-saga-routines";

import {
  IGetComponentErrorPayload,
  IGetComponentSuccessPayload,
  IGetComponentTriggerPayload,

  IEditComponentErrorPayload,
  IEditComponentSuccessPayload,
  IEditComponentTriggerPayload,

  ICreateComponentErrorPayload,
  ICreateComponentSuccessPayload,
  ICreateComponentTriggerPayload,
} from "../../../resources/types/component.type";

export const createComponentRoutine = createRoutine("CREATE_COMPONENT", {
  failure: (payload: ICreateComponentErrorPayload) => (payload),
  success: (payload: ICreateComponentSuccessPayload) => (payload),
  trigger: (payload: ICreateComponentTriggerPayload) => (payload),
});

export const getComponentRoutine = createRoutine("GET_COMPONENT", {
  failure: (payload: IGetComponentErrorPayload) => (payload),
  success: (payload: IGetComponentSuccessPayload) => (payload),
  trigger: (payload: IGetComponentTriggerPayload) => (payload),
});

export const editComponentRoutine = createRoutine("EDIT_COMPONENT", {
  failure: (payload: IEditComponentErrorPayload) => (payload),
  success: (payload: IEditComponentSuccessPayload) => (payload),
  trigger: (payload: IEditComponentTriggerPayload) => (payload),
});
