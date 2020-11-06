import { combineReducers } from "redux";

import { authReducer } from "./auth/auth.reducer";
import { IAuthReducer } from "../../resources/types/auth.type";

export interface IRootReducer {
  authReducer: IAuthReducer;
}

export const rootReducer = combineReducers({
  authReducer,
});
