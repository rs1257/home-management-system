import AssetRepository from '../repository/assetRepository';
import { CustomResponse, handleResponseData } from '../utils/customResponse';
import { options } from './options';

const assetsRepo = new AssetRepository();

export const assets = {
  ...options,
  GET: async (): Promise<CustomResponse> =>
    await handleResponseData(
      async () => {
        return await assetsRepo.list();
      },
      200,
      404
    ),
};
