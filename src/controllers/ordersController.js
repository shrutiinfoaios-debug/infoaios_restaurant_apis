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

/**
 * @function view_order
 * @description Express controller: renders order detail.
 *
 * @route POST /order/order_view/:id
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
exports.view_order = async (req, res) => {
  try {
    const viewOrder = await ordersService.viewOrder(
      req.params.id
    );

    res.status(200).json(viewOrder);
  } catch (e) {
    res.status(constants.HTTP_400).json({ message: e.message });
  }
};  

  /**
   * @function update_order
   * @description Express controller: updates a order detail.
   *
   * @route PUT /order/update_order/:id
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  exports.update_order = async (req, res) => {
    try {
      const updatedOrder = await ordersService.updateOrder(
        req.params.id,
        req.body,
        req.user._id
      );
  
      res.status(200).json(updatedOrder);
    } catch (e) {
      res.status(constants.HTTP_400).json({ message: e.message });
    }
  };

  /**
   * @function delete_order
   * @description Express controller: deletes a order.
   *
   * @route DELETE /order/delete_order/:id
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  exports.delete_order = async (req, res) => {
    try {
      const deletedOrder = await ordersService.deleteOrder(
        req.params.id,
        req.user._id
      );
  
      res.status(200).json(deletedOrder);
    } catch (e) {
      res.status(constants.HTTP_400).json({ message: e.message });
    } 
  };  
  