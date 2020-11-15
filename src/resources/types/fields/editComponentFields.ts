import { EStatus } from "../component.type";

export enum EEditComponentFields {
  NAME = "name",
  PHASE = "phase",
  SPENT_TIME = "spentTime",
  DESCRIPTION = "description",
  ESTIMATED_TIME = "estimatedTime",
}

export enum EEditComponentDetailsFields {
  NOTES = "notes",
  FEATURES = "features",
  REQUIREMENTS = "requirements",
  FUTURE_FEATURES = "futureFeatures",
}

export interface IEditComponentFields {
  [EEditComponentFields.NAME]?: string,
  [EEditComponentFields.PHASE]?: EStatus,
  [EEditComponentFields.SPENT_TIME]?: string,
  [EEditComponentFields.DESCRIPTION]?: string,
  [EEditComponentFields.ESTIMATED_TIME]?: string,
}

export interface IEditComponentDetailsFields {
  [EEditComponentDetailsFields.NOTES]: string;
  [EEditComponentDetailsFields.FEATURES]: string;
  [EEditComponentDetailsFields.REQUIREMENTS]: string;
  [EEditComponentDetailsFields.FUTURE_FEATURES]: string;
}
