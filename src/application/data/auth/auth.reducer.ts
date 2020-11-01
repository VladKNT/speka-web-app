import { AnyAction } from "redux";

import { signInRoutine } from "./auth.routine";
import { IAuthReducer } from "../../../resources/types/auth.type";

const initialState: IAuthReducer = {
  loading: 0,
  error: null,
};

export const authReducer = (state = initialState, action: AnyAction): IAuthReducer => {
  switch (action.type) {
    case signInRoutine.REQUEST: {
      return {
        ...state,
        loading: state.loading++,
      };
    }

    case signInRoutine.FAILURE: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case signInRoutine.FULFILL: {
      return {
        ...state,
        loading: state.loading--,
      };
    }

    default: {
      return state;
    }
  }
}
