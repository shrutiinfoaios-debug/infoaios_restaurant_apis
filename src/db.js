/**
 * @fileoverview MongoDB Connection Module (Reusable + Retry + Winston Logging)
 */

const mongoose = require("mongoose");
const logger = require("./utils/logger"); // <-- Winston logger

const mongoURI = process.env.MONGODB_URI;
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 2000;

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    logger.info("MongoDB already connected — reusing existing connection.");
    return;
  }

  let attempts = 0;

  while (attempts < MAX_RETRIES) {
    try {
      attempts++;
      logger.info(`MongoDB: Attempt ${attempts}/${MAX_RETRIES}...`);

      await mongoose.connect(mongoURI, {
        socketTimeoutMS: 30000,
        connectTimeoutMS: 30000,
      });

      isConnected = true;
      logger.info("MongoDB connected successfully.");
      return;
    } catch (error) {
      logger.error(`MongoDB connection failed: ${error.message}`);

      if (attempts >= MAX_RETRIES) {
        logger.error("MongoDB: Max retries reached. Exiting...");
        throw error;
      }

      const retryDelay = RETRY_DELAY_MS * attempts;
      logger.warn(`Retrying in ${retryDelay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
  }
}

// Mongoose events
mongoose.connection.on("connected", () => logger.info("Mongoose connected"));
mongoose.connection.on("disconnected", () => {
  logger.warn("Mongoose disconnected");
  isConnected = false;
});
mongoose.connection.on("error", (err) =>
  logger.error("Mongoose error: " + err)
);

module.exports = connectDB;
