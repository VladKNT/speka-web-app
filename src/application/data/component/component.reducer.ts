import { AnyAction } from "redux";

import { signOutRoutine } from "../auth/auth.routine";
import { IComponentReducer } from "../../../resources/types/component.type";

import {
  getComponentRoutine,
  editComponentRoutine,
  createComponentRoutine,
  createComponentDetailsRoutine
} from "./component.routine";

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
    case createComponentRoutine.TRIGGER:
    case createComponentDetailsRoutine.TRIGGER: {
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

    case createComponentDetailsRoutine.SUCCESS: {
      return {
        ...state,
        componentDetails: action.payload.componentDetails,
      };
    }

    case getComponentRoutine.FAILURE:
    case editComponentRoutine.FAILURE:
    case createComponentRoutine.FAILURE:
    case createComponentDetailsRoutine.FAILURE: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case getComponentRoutine.FULFILL:
    case editComponentRoutine.FULFILL:
    case createComponentRoutine.FULFILL:
    case createComponentDetailsRoutine.FULFILL: {
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
