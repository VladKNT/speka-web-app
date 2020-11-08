import { createRoutine } from "redux-saga-routines";

import { IGetProjectErrorPayload, IGetProjectSuccessPayload } from "../../../resources/types/project.type";

export const getProjectsRoutine = createRoutine("GET_PROJECTS", {
  failure: (payload: IGetProjectErrorPayload) => (payload),
  success: (payload: IGetProjectSuccessPayload) => (payload),
});
