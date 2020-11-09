import { AnyAction } from "redux";

import { signOutRoutine } from "../auth/auth.routine";
import { IProjectReducer } from "../../../resources/types/project.type";
import { createProjectRoutine, editProjectRoutine, getProjectRoutine, getProjectsRoutine } from "./project.routine";

const initialState: IProjectReducer = {
  loading: 0,
  error: null,
  projects: [],
  selectedProject: null,
};

export const projectReducer = (state = initialState, action: AnyAction): IProjectReducer => {
  switch (action.type) {
    case getProjectRoutine.REQUEST:
    case getProjectsRoutine.REQUEST:
    case editProjectRoutine.REQUEST:
    case createProjectRoutine.REQUEST: {
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

    case getProjectRoutine.FAILURE:
    case getProjectsRoutine.FAILURE:
    case editProjectRoutine.FAILURE:
    case createProjectRoutine.FAILURE: {
      return {
        ...state,
        error: action.payload.message,
      };
    }

    case getProjectsRoutine.FULFILL: {
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
