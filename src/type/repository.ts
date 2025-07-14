export type IRepository<Model> = {
  collection: string;

  getByName(name: string): Promise<Model>;
  add(item: Model): Promise<boolean>;
  delete(name: string): Promise<boolean>;
};
