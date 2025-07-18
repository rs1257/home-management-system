export class InventoryItem {
  private readonly name: string;
  private readonly description?: string;
  private readonly quantity: number;
  private readonly threshold: number;

  public constructor(name: string, description: string | undefined, quantity: number, threshold: number) {
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.threshold = threshold;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string | undefined {
    return this.description;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getThreshold(): number {
    return this.threshold;
  }
}
