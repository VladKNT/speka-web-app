import { AnyAction } from "redux";

import { signOutRoutine } from "../auth/auth.routine";
import { IComponentReducer } from "../../../resources/types/component.type";

import {
  getComponentRoutine,
  editComponentRoutine,
  createComponentRoutine,
  clearComponentWithDetails,
  assignComponentMemberRoutine,
  getComponentAssigneesRoutine,
  createComponentDetailsRoutine,
  clearComparisonComponentDetails,
  getComponentDetailsByVersionRoutine,
} from "./component.routine";

const initialState: IComponentReducer = {
  loading: 0,
  error: null,
  component: null,
  componentAssignees: [],
  componentDetails: null,
  comparisonComponentDetails: null,
};

export const componentReducer = (state = initialState, action: AnyAction): IComponentReducer => {
  switch (action.type) {
    case getComponentRoutine.TRIGGER:
    case editComponentRoutine.TRIGGER:
    case createComponentRoutine.TRIGGER:
    case assignComponentMemberRoutine.TRIGGER:
    case getComponentAssigneesRoutine.TRIGGER:
    case createComponentDetailsRoutine.TRIGGER:
    case getComponentDetailsByVersionRoutine.TRIGGER: {
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

    case getComponentDetailsByVersionRoutine.SUCCESS: {
      return {
        ...state,
        comparisonComponentDetails: action.payload.componentDetails,
      };
    }

    case getComponentAssigneesRoutine.SUCCESS: {
      return {
        ...state,
        componentAssignees: action.payload.assignees,
      }
    }

    case getComponentRoutine.FAILURE:
    case editComponentRoutine.FAILURE:
    case createComponentRoutine.FAILURE:
    case assignComponentMemberRoutine.FAILURE:
    case getComponentAssigneesRoutine.FAILURE:
    case createComponentDetailsRoutine.FAILURE:
    case getComponentDetailsByVersionRoutine.FAILURE: {
      return {
        ...state,
        error: action.payload.error,
      };
    }

    case getComponentRoutine.FULFILL:
    case editComponentRoutine.FULFILL:
    case createComponentRoutine.FULFILL:
    case assignComponentMemberRoutine.FULFILL:
    case getComponentAssigneesRoutine.FULFILL:
    case createComponentDetailsRoutine.FULFILL:
    case getComponentDetailsByVersionRoutine.FULFILL: {
      return {
        ...state,
        loading: state.loading - 1,
      };
    }

    case clearComponentWithDetails.TRIGGER: {
      return {
        ...state,
        component: null,
        componentDetails: null,
        comparisonComponentDetails: null,
      }
    }

    case clearComparisonComponentDetails.TRIGGER: {
      return {
        ...state,
        comparisonComponentDetails: null,
      }
    }

    case signOutRoutine.TRIGGER: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
