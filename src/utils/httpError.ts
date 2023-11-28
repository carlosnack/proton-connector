export class HttpError extends Error {
  public status: number;
  public errors?: Record<string, any>[];
  constructor(status: number, message: string, errors?: Record<string, any>[]) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

export const isHttpError = <T extends { message: string; status?: number }>(
  err: HttpError | T
): err is HttpError =>
  err instanceof HttpError ||
  (typeof err.status === "number" && typeof err.message === "string");
