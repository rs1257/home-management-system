import type { Document } from 'mongodb';
import DocumentDeleteError from '../customErrors/documentDeleteError';
import DocumentInsertError from '../customErrors/documentInsertError';
import DocumentNotFoundError from '../customErrors/documentNotFoundError';
import DocumentUpdateError from '../customErrors/documentUpdateError';
import MongoSingleton from '../database/mongoSingleton';
import type { IRepository } from '../type/repository';

export default class BaseRepository<T extends Document> implements IRepository<T> {
  readonly collection: string;

  public async getByName(name: string): Promise<T> {
    const client = await MongoSingleton.getInstance();
    const document = await client.collection(this.collection).findOne<T>({ name });
    if (document === null) {
      throw new DocumentNotFoundError(JSON.stringify({ name }), this.collection);
    }
    return document;
  }

  public async list(): Promise<T[]> {
    const client = await MongoSingleton.getInstance();
    const documents = client.collection(this.collection).find<T>({});

    return await documents.toArray();
  }

  public async add(item: T): Promise<boolean> {
    const client = await MongoSingleton.getInstance();
    const { acknowledged } = await client.collection(this.collection).replaceOne({ name: item.getName() }, item, { upsert: true });
    if (!acknowledged) {
      throw new DocumentInsertError(JSON.stringify(item), this.collection);
    }
    return acknowledged;
  }

  public async update(name: string, item: T): Promise<boolean> {
    const client = await MongoSingleton.getInstance();
    const { acknowledged } = await client.collection(this.collection).updateOne({ name }, { $set: item }, { upsert: false });
    if (!acknowledged) {
      throw new DocumentUpdateError(JSON.stringify({ name, item }), this.collection);
    }
    return acknowledged;
  }

  public async delete(name: string): Promise<boolean> {
    const client = await MongoSingleton.getInstance();
    const { acknowledged } = await client.collection(this.collection).deleteOne({ name });
    if (!acknowledged) {
      throw new DocumentDeleteError(JSON.stringify({ name }), this.collection);
    }
    return acknowledged;
  }
}
