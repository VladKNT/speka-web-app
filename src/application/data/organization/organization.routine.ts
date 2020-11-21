import { createRoutine } from "redux-saga-routines";

import { IGetStaffErrorPayload, IGetStaffSuccessPayload } from "../../../resources/types/organization.type";

export const getStaffRoutine = createRoutine("GET_STAFF", {
  failure: (payload: IGetStaffErrorPayload) => (payload),
  success: (payload: IGetStaffSuccessPayload) => (payload),
});
