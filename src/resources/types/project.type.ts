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
  createdAt: number;
  description: string;
  updatedAt: number | null;
  deletedAt: number | null;
  previewUrl: string | null;
}

export interface IProjectReducer {
  loading: number;
  error: string | null;
  projects: IProject[];
  selectedProject: IProject | null;
}

export interface IGetProjectSuccessPayload {
  projects: IProject[];
}

export interface IGetProjectErrorPayload extends IErrorPayload {}
