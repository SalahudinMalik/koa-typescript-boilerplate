import { APP_NAME } from "./constants";
import winston from "winston";
import config from "./config";
import { v4 as uuidv4 } from "uuid";
const LOG_LEVEL = config.LOG_LEVEL;

const customFormat = winston.format.printf(({ level, message, requestId }) => {
  return `${level}: ${message} - requestId: ${requestId}`;
});

const logger = winston.createLogger({
  defaultMeta: {
    requestId: uuidv4(),
    name: APP_NAME,
  },
  format: customFormat,
  exitOnError: false,
  transports: [
    new winston.transports.Console({
      level: LOG_LEVEL,
    }),
  ],
});

// logger.error('ERROR')
// logger.warn('WARN')
// logger.info('INFO')
// logger.verbose('VERBOSE')
// logger.debug('DEBUG')
// logger.silly('SILLY')

export default logger;
