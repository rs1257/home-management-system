import { InventoryItem } from '../model/inventoryItem';
import BaseRepository from './baseRepository';

export default class InventoryRepository extends BaseRepository<InventoryItem> {
  public override readonly collection = 'inventory';
}
