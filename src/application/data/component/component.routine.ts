import { createRoutine } from "redux-saga-routines";

import {
  ICreateComponentErrorPayload,
  ICreateComponentSuccessPayload,
  ICreateComponentTriggerPayload,
} from "../../../resources/types/component.type";

export const createComponentRoutine = createRoutine("CREATE_COMPONENT", {
  failure: (payload: ICreateComponentErrorPayload) => (payload),
  success: (payload: ICreateComponentSuccessPayload) => (payload),
  trigger: (payload: ICreateComponentTriggerPayload) => (payload),
});
