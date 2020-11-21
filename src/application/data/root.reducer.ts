import { combineReducers } from "redux";

import { authReducer } from "./auth/auth.reducer";
import { userReducer } from "./user/user.reducer";
import { projectReducer } from "./project/project.reducer";
import { componentReducer } from "./component/component.reducer";
import { organizationReducer } from "./organization/organization.reducer";

import { IAuthReducer } from "../../resources/types/auth.type";
import { IUserReducer } from "../../resources/types/user.type";
import { IProjectReducer } from "../../resources/types/project.type";
import { IComponentReducer } from "../../resources/types/component.type";
import { IOrganizationReducer } from "../../resources/types/organization.type";

export interface IRootReducer {
  authReducer: IAuthReducer;
  userReducer: IUserReducer;
  projectReducer: IProjectReducer;
  componentReducer: IComponentReducer;
  organizationReducer: IOrganizationReducer;
}

export const rootReducer = combineReducers({
  authReducer,
  userReducer,
  projectReducer,
  componentReducer,
  organizationReducer,
});
