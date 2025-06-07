export class InventoryItem {
  private readonly name: string;
  private readonly quantity: number;

  public constructor(name: string, quantity: number) {
    this.name = name;
    this.quantity = quantity;
  }

  public getName() {
    return this.name
  }
}