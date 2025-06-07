export default class DocumentInsertError extends Error {
  constructor(document: string, collection: string) {
    super(`Document: ${document} failed to be inserted into the collection: ${collection}`);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, DocumentInsertError.prototype);
  }
}