import { combineReducers } from "redux";

import { authReducer } from "./auth/auth.reducer";
import { userReducer } from "./user/user.reducer";

import { IAuthReducer } from "../../resources/types/auth.type";
import { IUserReducer } from "../../resources/types/user.type";

export interface IRootReducer {
  authReducer: IAuthReducer;
  userReducer: IUserReducer;
}

export const rootReducer = combineReducers({
  authReducer,
  userReducer,
});
