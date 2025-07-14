import { Db, MongoClient } from 'mongodb';
import InvalidEnvVarsError from '../customErrors/invalidEnvVarsError';
import { logger } from '../utils/logger';

export default class MongoSingleton {
  private static instance: Db;

  private constructor() {}

  static async getInstance(): Promise<Db> {
    if (!this.instance) {
      try {
        const { DATABASE_URI, DATABASE } = process.env;
        if (!DATABASE_URI || !DATABASE) {
          throw new InvalidEnvVarsError();
        }

        const URI = DATABASE_URI;
        const dbName = DATABASE;
        const client = await MongoClient.connect(URI);
        this.instance = client.db(dbName);
      } catch (error) {
        logger.error(error);
      }
    }
    return this.instance;
  }

  public static close(): void {
    // this.instance. Will need to make the client the instances to I can close it.
  }
}
