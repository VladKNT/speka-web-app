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
