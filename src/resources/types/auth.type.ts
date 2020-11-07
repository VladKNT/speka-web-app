export interface IAuthReducer {
  loading: number;
  error: string | null;
}

export interface ISignInTriggerPayload {
  email: string;
  password: string;
}

export interface ISignInErrorPayload {
  error: string;
}

export interface ISignInDto extends ISignInTriggerPayload {
  fingerprint: string;
}

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}
