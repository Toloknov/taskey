export default class ApiError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static unauthorized() {
    return new ApiError(401, "unauthorized");
  }
  static badRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
}