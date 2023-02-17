export type MutationResult = {
  ok: boolean;
  error?: string;
};

export interface IResponse {
  ok: boolean;
  [key: string]: any;
}
