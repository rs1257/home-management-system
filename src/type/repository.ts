export type IRepository<Model> = {
  collection: string;

  add(item: Model): Promise<boolean>;
  delete(name: string): Promise<boolean>;
};
