export interface IError extends Error {
  status?: number;
  traceId?: string;
  stackTrace?: string;
}