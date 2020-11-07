import { createRoutine } from "redux-saga-routines";

import { IGetCurrentUserErrorPayload, IGetCurrentUserSuccessPayload } from "../../../resources/types/user.type";

export const getCurrentUserRoutine = createRoutine("GET_CURRENT_USER", {
  failure: (payload: IGetCurrentUserErrorPayload) => (payload),
  success: (payload: IGetCurrentUserSuccessPayload) => (payload),
});
