import { AnyAction } from "redux";

import { signOutRoutine } from "../auth/auth.routine";
import { IComponentReducer } from "../../../resources/types/component.type";
import { createComponentRoutine, getComponentRoutine } from "./component.routine";

const initialState: IComponentReducer = {
  loading: 0,
  error: null,
  component: null,
  componentDetails: null,
  comparisonComponentDetails: null,
};

export const componentReducer = (state = initialState, action: AnyAction): IComponentReducer => {
  switch (action.type) {
    case getComponentRoutine.TRIGGER:
    case createComponentRoutine.TRIGGER: {
      return {
        ...state,
        loading: state.loading + 1,
      };
    }

    case getComponentRoutine.SUCCESS: {
      const { component, componentDetails } = action.payload;

      return {
        ...state,
        component,
        componentDetails,
      };
    }

    case getComponentRoutine.FAILURE:
    case createComponentRoutine.FAILURE: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case getComponentRoutine.FULFILL:
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
