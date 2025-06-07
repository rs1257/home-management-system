export default class DocumentUpdateError extends Error {
  constructor(params: string, collection: string) {
    super(`Document failed to update with params: ${params} on the collection: ${collection}`);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, DocumentUpdateError.prototype);
  }
}