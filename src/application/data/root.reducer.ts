import { combineReducers } from "redux";

import { authReducer } from "./auth/auth.reducer";
import { userReducer } from "./user/user.reducer";
import { projectReducer } from "./project/project.reducer";
import { componentReducer } from "./component/component.reducer";

import { IAuthReducer } from "../../resources/types/auth.type";
import { IUserReducer } from "../../resources/types/user.type";
import { IProjectReducer } from "../../resources/types/project.type";
import { IComponentReducer } from "../../resources/types/component.type";

export interface IRootReducer {
  authReducer: IAuthReducer;
  userReducer: IUserReducer;
  projectReducer: IProjectReducer;
  componentReducer: IComponentReducer;
}

export const rootReducer = combineReducers({
  authReducer,
  userReducer,
  projectReducer,
  componentReducer,
});
