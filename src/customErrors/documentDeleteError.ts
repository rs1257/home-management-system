export default class DocumentDeleteError extends Error {
  constructor(params: string, collection: string) {
    super(`Document failed to delete with params: ${params} on the collection: ${collection}`);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, DocumentDeleteError.prototype);
  }
}