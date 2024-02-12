import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

/**
 * Custom log levels.
 */
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5
};

/**
 * Add color coding to log levels.
 */
winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  verbose: 'cyan',
  debug: 'white'
});

/**
 * Log format combining timestamp, colorization, and custom print format.
 */
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(
    (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
  )
);

/**
 * Transports for logging to console and files using DailyRotateFile.
 */
const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      format
    )
  }),
  new DailyRotateFile({
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    level: 'error',
    zippedArchive: true,
    maxSize: '10m',
    maxFiles: '14d'
  }),
  new DailyRotateFile({
    filename: 'logs/all-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '10m',
    maxFiles: '14d'
  })
];

const logger = winston.createLogger({
  level: 'debug',
  levels,
  format,
  transports
});

export default logger;
