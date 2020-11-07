import { AnyAction } from "redux";

import { signOutRoutine } from "../auth/auth.routine";
import { getCurrentUserRoutine } from "./user.routine";
import { IUserReducer } from "../../../resources/types/user.type";

const initialState: IUserReducer = {
  loading: 0,
  error: null,
  currentUser: null,
};

export const userReducer = (state = initialState, action: AnyAction): IUserReducer => {
  switch (action.type) {
    case getCurrentUserRoutine.REQUEST: {
      return {
        ...state,
        loading: state.loading + 1,
      };
    }

    case getCurrentUserRoutine.SUCCESS: {
      return {
        ...state,
        currentUser: action.payload.user,
      };
    }

    case getCurrentUserRoutine.FAILURE: {
      return {
        ...state,
        error: action.payload.message,
      };
    }

    case getCurrentUserRoutine.FULFILL: {
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
