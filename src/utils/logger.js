/**
 * @fileoverview Winston Logger Module
 * Provides a production-grade logger with:
 * - Timestamped logs
 * - Daily rotated log files
 * - Pretty console logs for development
 */

const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize, json } = format;
require("winston-daily-rotate-file");

// Log format for console
const consoleFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

// Daily rotate file transport
const fileRotateTransport = new transports.DailyRotateFile({
  filename: "logs/app-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

const logger = createLogger({
  level: "info",
  format: combine(timestamp(), json()),
  transports: [
    fileRotateTransport,
    // Console only in development
    new transports.Console({
      format: combine(colorize(), timestamp(), consoleFormat),
    }),
  ],
});

module.exports = logger;
