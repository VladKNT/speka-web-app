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
  ICreateComponentDetailsErrorPayload,
  ICreateComponentDetailsSuccessPayload,
  ICreateComponentDetailsTriggerPayload,
  IGetComponentDetailsByVersionErrorPayload,
  IGetComponentDetailsByVersionSuccessPayload,
  IGetComponentDetailsByVersionTriggerPayload,
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

export const createComponentDetailsRoutine = createRoutine("CREATE_COMPONENTS_DETAILS", {
  failure: (payload: ICreateComponentDetailsErrorPayload) => (payload),
  success: (payload: ICreateComponentDetailsSuccessPayload) => (payload),
  trigger: (payload: ICreateComponentDetailsTriggerPayload) => (payload),
});

export const getComponentDetailsByVersionRoutine = createRoutine("GET_COMPONENT_BY_VERSION", {
  failure: (payload: IGetComponentDetailsByVersionErrorPayload) => (payload),
  success: (payload: IGetComponentDetailsByVersionSuccessPayload) => (payload),
  trigger: (payload: IGetComponentDetailsByVersionTriggerPayload) => (payload),
});

export const clearComponentWithDetails = createRoutine("CLEAR_COMPONENT_WITH_DETAILS");
export const clearComparisonComponentDetails = createRoutine("CLEAR_COMPARISON_COMPONENT_DETAILS");
