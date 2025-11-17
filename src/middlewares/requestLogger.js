/**
 * @fileoverview Request Logger Middleware (Morgan + Winston)
 */

const morgan = require("morgan");
const logger = require("../utils/logger");

// Morgan format
const format = ":method :url :status - :response-time ms";

// Send Morgan logs to Winston instead of console
const stream = {
  write: (message) => logger.info(message.trim())
};

// Ensure preflight (OPTIONS) requests also get logged
const skip = (req, res) => {
  return false; // ALWAYS log
};

/**
 * Morgan request logger middleware
 */
module.exports = morgan(format, { stream, skip });
