import { CustomResponse } from '../utils/customResponse';

export const options = { OPTIONS: (): CustomResponse => new CustomResponse(null, { status: 204 }) };
