export default class DocumentNotFoundError extends Error {
  constructor(params: string, collection: string) {
    super(`Document not found with params: ${params} on the collection: ${collection}`);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, DocumentNotFoundError.prototype);
  }
}