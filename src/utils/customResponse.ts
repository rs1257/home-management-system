import type { BodyInit } from 'bun';
import { logger } from './logger';

export class CustomResponse extends Response {
  constructor(body: BodyInit | null = null, init?: ResponseInit) {
    super(body, init);
    this.headers.set('Access-Control-Allow-Origin', '*');
    this.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
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
