import { AnyAction } from "redux";

import { signOutRoutine } from "../auth/auth.routine";
import { IComponentReducer } from "../../../resources/types/component.type";
import { createComponentRoutine, editComponentRoutine, getComponentRoutine } from "./component.routine";

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
    case editComponentRoutine.TRIGGER:
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

    case editComponentRoutine.SUCCESS: {
      return {
        ...state,
        component: action.payload.component,
      };
    }

    case getComponentRoutine.FAILURE:
    case editComponentRoutine.FAILURE:
    case createComponentRoutine.FAILURE: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case getComponentRoutine.FULFILL:
    case editComponentRoutine.FULFILL:
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
