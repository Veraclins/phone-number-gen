export default class ApplicationError extends Error {
  constructor(message, code, errors) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.message = message || 'Something went wrong. Please try again.';

    this.code = code || 500;
    this.errors = errors || {};
  }
}
