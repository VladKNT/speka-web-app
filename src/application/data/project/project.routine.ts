import { createRoutine } from "redux-saga-routines";

import {
  IGetProjectErrorPayload,
  IGetProjectSuccessPayload,
  IGetProjectTriggerPayload,

  IEditProjectErrorPayload,
  IEditProjectSuccessPayload,
  IEditProjectTriggerPayload,

  ICreateProjectErrorPayload,
  ICreateProjectSuccessPayload,
  ICreateProjectTriggerPayload,

  IGetUserProjectsErrorPayload,
  IGetUserProjectsSuccessPayload,
} from "../../../resources/types/project.type";

export const getProjectRoutine = createRoutine("GET_PROJECT", {
  failure: (payload: IGetProjectErrorPayload) => (payload),
  success: (payload: IGetProjectSuccessPayload) => (payload),
  trigger: (payload: IGetProjectTriggerPayload) => (payload),
});

export const getProjectsRoutine = createRoutine("GET_PROJECTS", {
  failure: (payload: IGetUserProjectsErrorPayload) => (payload),
  success: (payload: IGetUserProjectsSuccessPayload) => (payload),
});

export const createProjectRoutine = createRoutine("CREATE_PROJECT", {
  failure: (payload: ICreateProjectErrorPayload) => (payload),
  success: (payload: ICreateProjectSuccessPayload) => (payload),
  trigger: (payload: ICreateProjectTriggerPayload) => (payload),
});

export const editProjectRoutine = createRoutine("EDIT_PROJECT", {
  failure: (payload: IEditProjectErrorPayload) => (payload),
  success: (payload: IEditProjectSuccessPayload) => (payload),
  trigger: (payload: IEditProjectTriggerPayload) => (payload),
});
