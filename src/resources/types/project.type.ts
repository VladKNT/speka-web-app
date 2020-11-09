import { IErrorPayload } from "./common.type";

export enum EPhase {
  INITIAL = "Initial",
  PLANNING = "Planning",
  IMPLEMENTATION = "Implementation",
  CLOSING = "Closing",
}

export interface IProject {
  id: string;
  name: string;
  phase: EPhase;
  createdAt: string;
  description: string;
  updatedAt: string | null;
  deletedAt: string | null;
  previewUrl: string | null;
}

export interface ICreateProjectDto {
  name: string;
  description: string;
}

export interface IEditProjectDto {
  id: string;
  name?: string;
  phase?: EPhase;
  description?: string;
}

export interface IProjectReducer {
  loading: number;
  error: string | null;
  projects: IProject[];
  selectedProject: IProject | null;
}

// Get project
export interface IGetProjectTriggerPayload {
  id: string;
}

export interface IGetUserProjectsSuccessPayload {
  projects: IProject[];
}

export interface IGetProjectErrorPayload extends IErrorPayload {}

// Get user projects

export interface IGetProjectSuccessPayload {
  project: IProject;
}

export interface IGetUserProjectsErrorPayload extends IErrorPayload {}

// Create Project

export interface ICreateProjectErrorPayload extends IErrorPayload {}
export interface ICreateProjectTriggerPayload extends ICreateProjectDto {}
export interface ICreateProjectSuccessPayload extends IGetProjectSuccessPayload {}

// Edit Project

export interface IEditProjectErrorPayload extends IErrorPayload {}
export interface IEditProjectTriggerPayload extends IEditProjectDto {}
export interface IEditProjectSuccessPayload extends IGetProjectSuccessPayload {}
