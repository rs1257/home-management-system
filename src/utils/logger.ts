import { addColors, createLogger, format, transports } from 'winston';

addColors({
  info: 'bold blue',
  warn: 'italic yellow',
  error: 'bold red',
  debug: 'green',
});

export const logger = createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
  format: format.combine(
    format.timestamp(),
    format.prettyPrint(),
    format.colorize({
      all: true,
    })
  ),
  transports: [new transports.Console()],
});
