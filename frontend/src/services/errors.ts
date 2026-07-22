/**
 * Typed API error used to surface backend failure messages.
 */

export class ApiError extends Error {
  status: number;
  errors: string[];

  constructor(message: string, status: number, errors: string[] = []) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

export class NetworkError extends ApiError {
  constructor(message: string = "Unable to reach the server") {
    super(message, 0, []);
    this.name = "NetworkError";
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function isNetworkError(error: unknown): error is NetworkError {
  return error instanceof NetworkError;
}
