/**
 * @fileoverview Call Logs Controller
 * Handles Express behavior:
 * - Creating call logs
 * - Listing call logs
 */

const callLogsService = require("../services/call.service");
const constants = require("../utils/constants");

/**
 * @function create_calllog
 * @description Express controller: creates a new call log entry.
 *
 * @route POST /calllog/create_calllog
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
exports.create_calllog = async (req, res) => {
  try {
    const callLog = await callLogsService.createCallLog(req.body, req.user._id);
    res.json(callLog);
  } catch (error) {
    res
      .status(constants.HTTP_500)
      .json({ message: constants.SOMETHING_WENT_WRONG });
  }
};

/**
 * @function calllog_list
 * @description Express controller: returns all call logs with optional filtering.
 *
 * @route GET /calllog/calllog_list
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 */
exports.calllog_list = async (req, res, next) => {
  try {
    const restaurantId = req.query.restaurantId || null;
    const logs = await callLogsService.listCallLogs(restaurantId);
    res.send(logs);
  } catch (error) {
    res
      .status(constants.HTTP_500)
      .json({ message: constants.SOMETHING_WENT_WRONG });
  }
};
