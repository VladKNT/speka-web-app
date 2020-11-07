import { AnyAction } from "redux";

import { IAuthReducer } from "../../../resources/types/auth.type";
import { signInRoutine, signOutRoutine, signUpRoutine } from "./auth.routine";

const initialState: IAuthReducer = {
  loading: 0,
  error: null,
};

export const authReducer = (state = initialState, action: AnyAction): IAuthReducer => {
  switch (action.type) {
    case signInRoutine.REQUEST:
    case signUpRoutine.REQUEST: {
      return {
        ...state,
        loading: state.loading + 1,
      };
    }

    case signInRoutine.FAILURE:
    case signUpRoutine.FAILURE: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case signInRoutine.FULFILL:
    case signUpRoutine.FULFILL: {
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
