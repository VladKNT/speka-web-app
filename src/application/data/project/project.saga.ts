import { put, select } from "redux-saga/effects";

import { IRootReducer } from "../root.reducer";
import { IProject } from "../../../resources/types/project.type";
import { ProjectService } from "../../../services/api/ProjectService";
import { editProjectRoutine, getProjectRoutine, getProjectsRoutine } from "./project.routine";

const ProjectApi = new ProjectService();

export function* gerProject(action: ReturnType<typeof getProjectRoutine.trigger>) {
  try {
    yield put(getProjectRoutine.request());
    const project = yield ProjectApi.getProjectById(action.payload.id);
    yield put(getProjectRoutine.success({ project }));
  } catch (error) {
    yield put(getProjectRoutine.failure({ error: error.message }));
  } finally {
    yield put(getProjectRoutine.fulfill());
  }
}

export function* gerProjects() {
  try {
    yield put(getProjectsRoutine.request());
    const projects = yield ProjectApi.getUserProjectList();
    yield put(getProjectsRoutine.success({ projects }));
  } catch (error) {
    yield put(getProjectsRoutine.failure({ error: error.message }));
  } finally {
    yield put(getProjectsRoutine.fulfill());
  }
}

export function* editProject(action: ReturnType<typeof editProjectRoutine.trigger>) {
  try {
    yield put(editProjectRoutine.request());
    const selectedProject = yield select((state: IRootReducer) => state.projectReducer.selectedProject);

    yield ProjectApi.editProject(action.payload);

    const project: IProject = {
      ...selectedProject,
      ...action.payload,
      updatedAt: String(new Date()),
    }

    yield put(editProjectRoutine.success({ project }));
  } catch (error) {
    yield put(editProjectRoutine.failure({ error: error.message }));
  } finally {
    yield put(editProjectRoutine.fulfill());
  }
}
