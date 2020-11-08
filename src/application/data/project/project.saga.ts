import { put } from "redux-saga/effects";

import { getProjectsRoutine } from "./project.routine";
import { ProjectService } from "../../../services/api/ProjectService";

const ProjectApi = new ProjectService();

export function* gerProjects() {
  try {
    yield put(getProjectsRoutine.request());
    const projects = yield ProjectApi.getCurrentUser();
    yield put(getProjectsRoutine.success({ projects }));
  } catch (error) {
    yield put(getProjectsRoutine.failure({ error: error.message }));
  } finally {
    yield put(getProjectsRoutine.fulfill());
  }
}
