import logger from '../config/logger.config.js';
import { rateLimit } from 'express-rate-limit';

/**
 * Configurable rate limit settings.
 * Defines how long each rate limiting window lasts in milliseconds (1 hour by default).
 * Maximum number of login attempts allowed per window (default is 5 attempts per hour).
 * Maximum number of email requests allowed per window (default is 3 requests per hour).
 */
const RATE_LIMIT_WINDOW_MS = process.env.RATE_LIMIT_WINDOW_MS
  ? parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10)
  : 60 * 60 * 1000;
const RATE_LIMIT_MAX_LOGIN_ATTEMPTS = process.env.RATE_LIMIT_MAX_LOGIN_ATTEMPTS
  ? parseInt(process.env.RATE_LIMIT_MAX_LOGIN_ATTEMPTS, 10)
  : 5;
const RATE_LIMIT_MAX_EMAIL_REQUESTS = process.env.RATE_LIMIT_MAX_EMAIL_REQUESTS
  ? parseInt(process.env.RATE_LIMIT_MAX_EMAIL_REQUESTS, 10)
  : 3;

/**
 * Rate limiter for login attempts to protect against brute-force attacks.
 */
const loginAttemptLimiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS,
  limit: RATE_LIMIT_MAX_LOGIN_ATTEMPTS,
  statusCode: 429,
  skipSuccessfulRequests: true,
  message: { message: 'Too many failed login attempts. Please try again after an hour.' },
  handler: (request, response, next, options) => {
    if (request.rateLimit.used === request.rateLimit.limit + 1) {
      logger.warn(`Login rate limit reached for IP: ${request.ip}, Username: ${request.body.username}`);
    }
    response.status(options.statusCode).send(options.message)
  },
  standardHeaders: true,
  legacyHeaders: false
});

/**
 * Rate limiter for email sending requests to prevent abuse.
 */
const sendEmailLimiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS,
  limit: RATE_LIMIT_MAX_EMAIL_REQUESTS,
  message: { message: 'Too many requests, please try again later.' },
  handler: (request, response, next, options) => {
    if (request.rateLimit.used === request.rateLimit.limit + 1) {
      logger.warn(`Email sending rate limit reached for IP: ${request.ip}`);
    }
    response.status(options.statusCode).send(options.message)
  },
  standardHeaders: true,
  legacyHeaders: false
});

const limiter = {
  loginAttemptLimiter,
  sendEmailLimiter
}

export default limiter;
