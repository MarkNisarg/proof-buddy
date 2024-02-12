/**
 * A sophisticated logging utility for an application.
 *
 * This utility provides a uniform way to log messages at different levels
 * such as info, warn, error, and debug.
 * It automatically includes timestamps and the log level in messages.
 * In production environments, it can be extended to send logs to a remote logging service.
 */

// Check if the application is running in production mode.
const isProduction = process.env.REACT_APP_NODE_ENV === 'production';

/**
 * The base logging function used by all specific log level functions.
 *
 * @param {string} level - The log level ('log', 'warn', 'error', 'debug').
 * @param {string} message - The message to log.
 * @param {any[]} additionalDetails - Additional details to log with the message.
 */
const log = (level, message, ...additionalDetails) => {
  const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  const formattedMessage = `${timestamp} [${level.toUpperCase()}]: ${message}`;
  const details = additionalDetails.map(detail =>
    detail instanceof Error ? detail.stack : detail
  );

  if (!isProduction) {
    console[level](formattedMessage, ...details);
  } else {
    // In production, integrate with a remote logging service.
    // This part can be customized based on the service used, such as Sentry, LogRocket, etc.
    // Example: sendLogToRemoteService(level, formattedMessage, additionalDetails);
  }
};

/**
 * Logs an informational message.
 * Use this for general, non-critical information.
 *
 * @param {string} message - The message to log.
 * @param {any[]} additionalDetails - Additional details to accompany the message.
 */
const info = (message, ...additionalDetails) => {
  log('log', message, ...additionalDetails);
}

/**
 * Logs a warning message.
 * Use this for potential issues or important warnings that do not halt the application.
 *
 * @param {string} message - The message to log.
 * @param {any[]} additionalDetails - Additional details to accompany the message.
 */
const warn = (message, ...additionalDetails) => {
  log('warn', message, ...additionalDetails);
}

/**
 * Logs an error message.
 * Use this for errors that could affect the application flow or require attention.
 *
 * @param {string} message - The message to log.
 * @param {any[]} additionalDetails - Additional details to accompany the message.
 */
const error = (message, ...additionalDetails) => {
  log('error', message, ...additionalDetails);
}

/**
 * Logs a debug message.
 * Use this for detailed information useful during development.
 *
 * @param {string} message - The message to log.
 * @param {any[]} additionalDetails - Additional details to accompany the message.
 */
const debug = (message, ...additionalDetails) => {
  log('debug', message, ...additionalDetails);
}

const logger = {
  info,
  warn,
  error,
  debug
}

export default logger;
