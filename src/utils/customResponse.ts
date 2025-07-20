import type { BodyInit } from 'bun';
import { logger } from './logger';
import type { SuccessCode, ErrorCode } from '../type/response';

export class CustomResponse extends Response {
  constructor(body: BodyInit | null = null, init?: ResponseInit) {
    super(body, init);
    this.headers.set('Access-Control-Allow-Origin', '*');
    this.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    this.headers.set(
      'Access-Control-Allow-Headers',
      'access-control-allow-origin, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    );

    if (String(init?.status ?? 200).startsWith('2')) {
      logger.info(`Response created with status: ${init?.status ?? 200}, body: ${body ? JSON.stringify(body) : 'null'}`);
    } else {
      logger.error(`Response created with status: ${init?.status ?? 500}, body: ${body ? JSON.stringify(body) : 'null'}`);
    }
  }
}

export const handleResponse = async (callback: () => Promise<void>, successMessage: string, successCode: SuccessCode, errorCode: ErrorCode): Promise<CustomResponse> => {
  try {
    await callback();
    return new CustomResponse(JSON.stringify({ message: successMessage }), { status: successCode });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return new CustomResponse(JSON.stringify({ error: message }), { status: errorCode });
  }
};

export const handleResponseData = async <T>(callback: () => Promise<T>, successCode: SuccessCode, errorCode: ErrorCode): Promise<CustomResponse> => {
  try {
    const data = await callback();
    return new CustomResponse(JSON.stringify(data), { status: successCode });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return new CustomResponse(JSON.stringify({ error: message }), { status: errorCode });
  }
};
