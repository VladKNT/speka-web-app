import { AnyAction } from "redux";

import { signOutRoutine } from "../auth/auth.routine";
import { IProjectReducer } from "../../../resources/types/project.type";

import {
  getProjectRoutine,
  getProjectsRoutine,
  editProjectRoutine,
  createProjectRoutine,
  getProjectComponentsRoutine,
} from "./project.routine";

const initialState: IProjectReducer = {
  loading: 0,
  error: null,
  projects: [],
  selectedProject: null,
  selectedProjectComponents: [],
};

export const projectReducer = (state = initialState, action: AnyAction): IProjectReducer => {
  switch (action.type) {
    case getProjectRoutine.REQUEST:
    case getProjectsRoutine.REQUEST:
    case editProjectRoutine.REQUEST:
    case createProjectRoutine.REQUEST:
    case getProjectComponentsRoutine.REQUEST: {
      return {
        ...state,
        loading: state.loading + 1,
      };
    }

    case getProjectRoutine.SUCCESS:
    case editProjectRoutine.SUCCESS: {
      return {
        ...state,
        selectedProject: action.payload.project,
      };
    }

    case getProjectsRoutine.SUCCESS: {
      return {
        ...state,
        projects: action.payload.projects,
      };
    }

    case createProjectRoutine.SUCCESS: {
      return {
        ...state,
        projects: [action.payload.project, ...state.projects],
      };
    }

    case getProjectComponentsRoutine.SUCCESS: {
      return {
        ...state,
        selectedProjectComponents: action.payload.components,
      };
    }

    case getProjectRoutine.FAILURE:
    case getProjectsRoutine.FAILURE:
    case editProjectRoutine.FAILURE:
    case createProjectRoutine.FAILURE:
    case getProjectComponentsRoutine.FAILURE: {
      return {
        ...state,
        error: action.payload.message,
      };
    }

    case getProjectRoutine.FULFILL:
    case getProjectsRoutine.FULFILL:
    case editProjectRoutine.FULFILL:
    case createProjectRoutine.FULFILL:
    case getProjectComponentsRoutine.FULFILL: {
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
