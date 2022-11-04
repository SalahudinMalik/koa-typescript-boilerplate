import { HttpError } from "./HttpError";

/**
 * Exception for 409 HTTP error.
 */
export class ConflictError extends HttpError {
  name = "ConflictError";

  constructor(message?: string) {
    super(409);
    Object.setPrototypeOf(this, ConflictError.prototype);

    if (message) this.message = message;
  }
}
