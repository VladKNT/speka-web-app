import { IErrorPayload, TCallback } from "./common.type";

export enum EStatus {
  PLANNING = "Planning",
  IN_PROGRESS = "In progress",
  READY_FOR_TESTING = "Ready for testing",
  COMPLETED = "Completed",
  CANCELED = "Canceled",
}

export interface ICreateComponentDetailsDto {
  notes?: string;
  features?: string;
  requirements?: string;
  futureFeatures?: string;
}

export interface ICreateComponentDto {
  name: string;
  projectId: string;
  description: string;
  estimatedTime?: number;
  details: ICreateComponentDetailsDto;
}

export interface IEditComponentDto {
  id: string;
  name?: string;
  phase?: EStatus;
  spentTime?: number;
  description?: string;
  estimatedTime?: number;
}

export interface IComponent {
  id: string;
  name: string;
  phase: EStatus;
  spentTime: number;
  createdAt: string;
  updatedAt: string;
  description: string;
  estimatedTime: number;
  deletedAt: string | null;
}

export interface IComponentDetails {
  id: string;
  notes: string;
  version: number;
  features: string;
  createdAt: string;
  requirements: string;
  futureFeatures: string;
}

export interface IComponentWithDetails {
  component: IComponent;
  componentDetails: IComponentDetails;
}

export interface IComponentReducer {
  loading: number;
  error: string | null;
  component: IComponent | null;
  componentDetails: IComponentDetails | null;
  comparisonComponentDetails: IComponentDetails | null;
}

// Create Component

export interface ICreateComponentSuccessPayload {
  component: IComponent;
}

export interface ICreateComponentTriggerPayload extends ICreateComponentDto {
  callback: TCallback;
}

export interface ICreateComponentErrorPayload extends IErrorPayload {}

// Get Component

export interface IGetComponentTriggerPayload {
  id: string;
}

export interface IGetComponentErrorPayload extends IErrorPayload {}
export interface IGetComponentSuccessPayload extends IComponentWithDetails {}

// Edit Component

export interface IEditComponentErrorPayload extends IErrorPayload {}
export interface IEditComponentTriggerPayload extends IEditComponentDto {}
export interface IEditComponentSuccessPayload extends ICreateComponentSuccessPayload {}
