export default class InvalidEnvVarsError extends Error {
  constructor() {
    super(`Mandatory env vars are missing`);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, InvalidEnvVarsError.prototype);
  }
}