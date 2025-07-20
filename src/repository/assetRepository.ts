import BaseRepository from './baseRepository';

type AssetItem = {
  name: string;
  type: string;
  value: number;
};

export default class AssetRepository extends BaseRepository<AssetItem> {
  public override readonly collection = 'assets';
}
