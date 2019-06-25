import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  // change level if in dev environment versus production
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: 'debug',
      format: format.combine(
        format.colorize(),
        format.printf(
          debug => `${debug.timestamp} ${debug.level}: ${debug.message}`
        )
      ),
    }),
  ],
});

export default logger;
