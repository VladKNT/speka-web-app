import { IErrorPayload } from "./common.type";
import { IOrganization } from "./organization.type";

export interface IUserDetails {
  id: string;
  lastName: string;
  firstName: string;
  createdAt: number;
  avatarUrl: string | null;
  updatedAt: number | null;
  deletedAt: number | null;
}

export interface IUser {
  id: string;
  email: string;
  createdAt: number;
  contactNumber: string;
  updatedAt: number | null;
  deletedAt: number | null;
  userDetails: IUserDetails;
  organization: IOrganization;
}

export interface IUserReducer {
  loading: number;
  error: string | null;
  currentUser: IUser | null;
}

export interface IGetCurrentUserSuccessPayload {
  user: IUser;
}

export interface IGetCurrentUserErrorPayload extends IErrorPayload {}
