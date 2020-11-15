import { EStatus } from "../types/component.type";

import {
  IEditComponentFields,
  EEditComponentFields,
  IEditComponentDetailsFields,
  EEditComponentDetailsFields,
} from "../types/fields/editComponentFields";

export const initialEditComponent: IEditComponentFields = {
  [EEditComponentFields.NAME]: "",
  [EEditComponentFields.SPENT_TIME]: "",
  [EEditComponentFields.DESCRIPTION]: "",
  [EEditComponentFields.ESTIMATED_TIME]: "",
  [EEditComponentFields.PHASE]: EStatus.PLANNING,
};

export const initialEditComponentDetails: IEditComponentDetailsFields = {
  [EEditComponentDetailsFields.NOTES]: "",
  [EEditComponentDetailsFields.FEATURES]: "",
  [EEditComponentDetailsFields.REQUIREMENTS]: "",
  [EEditComponentDetailsFields.FUTURE_FEATURES]: "",
}
