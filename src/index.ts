import { InventoryItem } from "./model/inventoryItem";
import InventoryRepository from "./repository/inventoryRepository";
import { logger } from "./utils/logger";

logger.info('Hello via Bun!');

const repo = new InventoryRepository()

await repo.add(new InventoryItem("bob", 0))

await repo.updateQuantity("bob", 22)

await repo.delete("bob")


logger.debug('Hello via Bun!');
