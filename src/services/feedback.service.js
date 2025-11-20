/**
 * @fileoverview Feedbacks Service
 * Handles business logic:
 * - Creating feedbacks
 * - Listing feedbacks with restaurant info lookup
 */

const feedbacksSchema = require("../models/feedbacksSchema");
const mongoose = require("mongoose");

module.exports = {
  /**
   * @function createFeedback
   * @description Creates a new feedback document in the database.
   *
   * @param {Object} data - Raw feedback data
   * @param {string} createdBy - User ID creating the feedback
   * @returns {Promise<Object>} Created feedback document
   */
  async createFeedback(data, createdBy) {
    const log = new feedbacksSchema({
      ...data,
      createdBy,
    });
    return await log.save();
  },

  /**
   * @function listFeedbacks
   * @description Returns feedbacks with optional restaurant filter and joined restaurant data.
   *
   * @param {string|null} restaurantId - Optional restaurant ID
   * @returns {Promise<Array>} Array of feedbacks with restaurant details
   */
  async listFeedbacks(restaurantId) {
    const filter = restaurantId
      ? { userRestaurantId: new mongoose.Types.ObjectId(restaurantId) }
      : {};

    return feedbacksSchema.aggregate([
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
