import DocumentDeleteError from '../customErrors/documentDeleteError';
import DocumentInsertError from '../customErrors/documentInsertError';
import DocumentNotFoundError from '../customErrors/documentNotFoundError';
import DocumentUpdateError from '../customErrors/documentUpdateError';
import MongoSingleton from '../database/mongoSingleton';
import { InventoryItem } from '../model/inventoryItem';
import type { IRepository } from '../type/repository';

export default class InventoryRepository implements IRepository<InventoryItem> {
  public readonly collection = 'inventory';

  public async getByName(name: string): Promise<InventoryItem> {
    const client = await MongoSingleton.getInstance();
    const document = await client.collection(this.collection).findOne<InventoryItem>({ name });
    if (document === null) {
      throw new DocumentNotFoundError(JSON.stringify({ name }), this.collection);
    }
    return document;
  }

  public async list(): Promise<InventoryItem[]> {
    const client = await MongoSingleton.getInstance();
    const documents = client.collection(this.collection).find<InventoryItem>({});

    return await documents.toArray();
  }

  public async add(item: InventoryItem): Promise<boolean> {
    const client = await MongoSingleton.getInstance();
    const { acknowledged } = await client.collection(this.collection).replaceOne({ name: item.getName() }, item, { upsert: true });
    if (!acknowledged) {
      throw new DocumentInsertError(JSON.stringify(item), this.collection);
    }
    return acknowledged;
  }

  public async updateQuantity(name: string, quantity: number): Promise<boolean> {
    const client = await MongoSingleton.getInstance();
    const { acknowledged } = await client.collection(this.collection).updateOne({ name }, { $set: { quantity } }, { upsert: false });
    if (!acknowledged) {
      throw new DocumentUpdateError(JSON.stringify({ name, quantity }), this.collection);
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
