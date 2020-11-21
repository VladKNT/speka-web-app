import { AnyAction } from "redux";

import { signOutRoutine } from "../auth/auth.routine";
import { getStaffRoutine } from "./organization.routine";
import { IOrganizationReducer } from "../../../resources/types/organization.type";

const initialState: IOrganizationReducer = {
  staff: [],
  loading: 0,
  error: null,
};

export const organizationReducer = (state = initialState, action: AnyAction): IOrganizationReducer => {
  switch (action.type) {
    case getStaffRoutine.REQUEST: {
      return {
        ...state,
        loading: state.loading + 1,
      };
    }

    case getStaffRoutine.SUCCESS: {
      return {
        ...state,
        staff: action.payload.staff,
      };
    }

    case getStaffRoutine.FAILURE: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case getStaffRoutine.FULFILL: {
      return {
        ...state,
        loading: state.loading - 1,
      };
    }

    case signOutRoutine.TRIGGER: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
