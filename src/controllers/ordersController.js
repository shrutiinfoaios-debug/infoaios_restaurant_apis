/**
 * @fileoverview Orders Controller
 * Handles Express-level behavior:
 * - Creating orders
 * - Listing orders
 */

const ordersService = require("../services/orders.service");
const constants = require("../utils/constants");

/**
 * @function create_order
 * @description Express controller: creates a new order.
 *
 * @route POST /order/create_order
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
exports.create_order = async (req, res) => {
  try {
    const createdBy = req.user._id;
    const ip = req.ip.split(":").slice(-1)[0];
    const order = await ordersService.createOrder(req.body, createdBy, ip);
    res.json(order);
  } catch (error) {
    res
      .status(constants.HTTP_500)
      .json({ message: constants.SOMETHING_WENT_WRONG });
  }
};

/**
 * @function order_list
 * @description Express controller: lists orders optionally filtered by restaurant.
 *
 * @route GET /order/order_list
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 */
exports.order_list = async (req, res, next) => {
  try {
    const restaurantId = req.query.restaurantId || null;
    const orders = await ordersService.listOrders(restaurantId);
    res.send(orders);
  } catch (error) {
    res
      .status(constants.HTTP_500)
      .json({ message: constants.SOMETHING_WENT_WRONG });
  }
};
