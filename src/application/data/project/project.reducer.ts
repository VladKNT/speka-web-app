import { AnyAction } from "redux";

import { signOutRoutine } from "../auth/auth.routine";
import { getProjectsRoutine } from "./project.routine";
import { IProjectReducer } from "../../../resources/types/project.type";

const initialState: IProjectReducer = {
  loading: 0,
  error: null,
  projects: [],
  selectedProject: null,
};

export const projectReducer = (state = initialState, action: AnyAction): IProjectReducer => {
  switch (action.type) {
    case getProjectsRoutine.REQUEST: {
      return {
        ...state,
        loading: state.loading + 1,
      };
    }

    case getProjectsRoutine.SUCCESS: {
      return {
        ...state,
        projects: action.payload.projects,
      };
    }

    case getProjectsRoutine.FAILURE: {
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
