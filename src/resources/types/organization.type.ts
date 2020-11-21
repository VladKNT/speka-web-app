import { IUser } from "./user.type";
import {IErrorPayload} from "./common.type";

export interface IOrganization {
  id: string;
  name: string;
  email: string;
  createdAt: number;
  contactNumber: string;
  logoUrl: string | null;
  updatedAt: number | null;
  deletedAt: number | null;
}

export interface IOrganizationReducer {
  staff: IUser[]
  loading: number;
  error: string | null;
}

// Get staff

export interface IGetStaffErrorPayload extends IErrorPayload {}
export interface IGetStaffSuccessPayload {
  staff: IUser[];
}
