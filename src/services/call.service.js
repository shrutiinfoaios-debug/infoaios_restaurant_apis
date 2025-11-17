/**
 * @fileoverview Call Logs Service
 * Handles business logic:
 * - Creating call logs
 * - Listing call logs with restaurant info lookup
 */

const callLogsSchema = require("../models/callLogsSchema");
const mongoose = require("mongoose");

module.exports = {
  /**
   * @function createCallLog
   * @description Creates a new call log document in the database.
   *
   * @param {Object} data - Raw call log data
   * @param {string} createdBy - User ID creating the call log
   * @returns {Promise<Object>} Created call log document
   */
  async createCallLog(data, createdBy) {
    const log = new callLogsSchema({
      ...data,
      createdBy,
    });
    return await log.save();
  },

  /**
   * @function listCallLogs
   * @description Returns call logs with optional restaurant filter and joined restaurant data.
   *
   * @param {string|null} restaurantId - Optional restaurant ID
   * @returns {Promise<Array>} Array of call logs with restaurant details
   */
  async listCallLogs(restaurantId) {
    const filter = restaurantId
      ? { userRestaurantId: new mongoose.Types.ObjectId(restaurantId) }
      : {};

    return callLogsSchema.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: "users",
          localField: "userRestaurantId",
          foreignField: "_id",
          as: "restaurantDetails",
          pipeline: [
            {
              $project: {
                restaurantName: 1,
                restaurantAddress: 1,
              },
            },
          ],
        },
      },
    ]);
  },
};
