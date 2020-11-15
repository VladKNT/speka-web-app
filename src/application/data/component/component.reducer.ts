import { AnyAction } from "redux";

import { signOutRoutine } from "../auth/auth.routine";
import { createComponentRoutine } from "./component.routine";
import { IComponentReducer } from "../../../resources/types/component.type";

const initialState: IComponentReducer = {
  loading: 0,
  error: null,
  component: null,
  componentDetails: null,
  comparisonComponentDetails: null,
};

export const componentReducer = (state = initialState, action: AnyAction): IComponentReducer => {
  switch (action.type) {
    case createComponentRoutine.TRIGGER: {
      return {
        ...state,
        loading: state.loading + 1,
      };
    }

    case createComponentRoutine.FAILURE: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case createComponentRoutine.FULFILL: {
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
