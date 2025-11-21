/**
 * @fileoverview Orders Service
 * Handles business logic:
 * - Creating restaurant orders
 * - Listing restaurant orders
 * - Rendering particular restaurant order
 * - Updating restaurant order
 * - Deleting restaurant order
 */

const ordersSchema = require("../models/ordersSchema");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
module.exports = {
  /**
   * @function createOrder
   * @description Creates a new restaurant order.
   *
   * @param {Object} data - Raw order data
   * @param {string} createdBy - Authenticated user ID
   * @param {string} ip - Client IP address
   * @returns {Promise<Object>} Created order document
   */
  async createOrder(data, createdBy, ip) {
    const order = new ordersSchema({
      ...data,
      createdBy,
      ipAddress: ip,
    });
    return await order.save();
  },

  /**
   * @function listOrders
   * @description Retrieves orders filtered by restaurant ID (optional).
   *
   * @param {string|null} restaurantId - Optional restaurant ID
   * @returns {Promise<Array>} List of orders
   */
  async listOrders(restaurantId) {
    const filter = restaurantId ? { userRestaurantId: restaurantId } : {};
    filter.isDeleted = false;
    return ordersSchema.find(filter);
  },

  /**
   * @function viewOrder
   * @description renders order details
   * @param {string} id - Order ID to view
   * @returns {Promise<Object|null>} rendered order document
   */
  async viewOrder(id) {
    return ordersSchema.findById(id);
  },

  /**
     * @function updateOrder
     * @description Updates order with validation.
     *
     * @param {string} id - Order ID to update
     * @param {Object} updates - Updated fields
     * @param {string} updatedBy - Authenticated user's ID
     * @returns {Promise<Object|null>} Updated order document
     */
    async updateOrder(id, updates, updatedBy) {
      updates.updatedBy = new ObjectId(updatedBy);
      return ordersSchema.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });
    },


    /**
     * @function deleteOrder
     * @description Deletes order with validation.
     *
     * @param {string} id - Order ID to delete
     * @param {string} deletedBy - Authenticated user's ID
     * @returns {Promise<Object|null>} Deleted order message
     */
    async deleteOrder(id, deletedBy) {
      updates = {}
      updates.deletedBy = new ObjectId(deletedBy);
      updates.isDeleted = true;
      return ordersSchema.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });
    },
};
