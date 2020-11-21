export type TCallback = () => void;
export type TNumberCallback = (value: number) => void;
export type TStringCallback = (value: string) => void;

export interface IErrorPayload {
  error: string;
}

export interface IIdRouteParam {
  id: string;
}
