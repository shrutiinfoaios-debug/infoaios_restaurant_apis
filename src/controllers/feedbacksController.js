/**
 * @fileoverview Feedbacks Controller
 * Handles Express behavior:
 * - Creating feedbacks
 * - Listing feedbacks
 */

const feedbacksService = require("../services/feedback.service");
const constants = require("../utils/constants");

/**
 * @function create_feedback
 * @description Express controller: creates a new feedback entry.
 *
 * @route POST /feedback/create_feedback
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
exports.create_feedback = async (req, res) => {
  try {
    const feedback = await feedbacksService.createFeedback(req.body, req.user._id);
    res.json(feedback);
  } catch (error) {
    res
      .status(constants.HTTP_500)
      .json({ message: constants.SOMETHING_WENT_WRONG });
  }
};

/**
 * @function feedback_list
 * @description Express controller: returns all feedbacks with optional filtering.
 *
 * @route GET /feedback/feedback_list
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 */
exports.feedback_list = async (req, res, next) => {
  try {
    const restaurantId = req.query.restaurantId || null;
    const logs = await feedbacksService.listFeedbacks(restaurantId);
    res.send(logs);
  } catch (error) {
    res
      .status(constants.HTTP_500)
      .json({ message: constants.SOMETHING_WENT_WRONG });
  }
};
