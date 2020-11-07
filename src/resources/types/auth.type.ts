import { IErrorPayload } from "./common.type";

export interface IAuthReducer {
  loading: number;
  error: string | null;
}

export interface ICredentials {
  email: string;
  password: string;
}

export interface IFingerprint {
  fingerprint: string;
}

export interface ISignInTriggerPayload extends ICredentials {}
export interface ISignInErrorPayload extends IErrorPayload {}
export interface ISignInDto extends ISignInTriggerPayload, IFingerprint {}

export interface ISignUpTriggerPayload extends ICredentials {
  lastName: string;
  firstName: string;
  contactNumber: string;
}

export interface ISignUpErrorPayload extends IErrorPayload {}
export interface ISignUpDto extends ISignUpTriggerPayload, IFingerprint {}

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}
