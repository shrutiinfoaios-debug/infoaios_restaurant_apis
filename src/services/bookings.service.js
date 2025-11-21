/**
 * @fileoverview Bookings Service
 * Handles business logic for:
 * - Creating bookings
 * - Listing bookings
 * - Rendering particular restaurant booking
 * - Updating restaurant booking
 */

const bookingsSchema = require("../models/bookingsSchema");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
  /**
   * @function createBooking
   * @description Creates a new booking entry.
   *
   * @param {Object} data - Booking details
   * @param {string} createdBy - User ID creating the booking
   * @param {string} ip - Client IP address
   * @returns {Promise<Object>} Newly created booking
   */
  async createBooking(data, createdBy, ip) {
    const booking = new bookingsSchema({
      ...data,
      createdBy,
      ipAddress: ip,
    });

    return await booking.save();
  },

  /**
   * @function listBookings
   * @description Returns a list of bookings, filtered by restaurant if provided.
   *
   * @param {string|null} restaurantId - Optional restaurant ID
   * @returns {Promise<Array>} Array of booking objects
   */
  async listBookings(restaurantId) {
    const filter = restaurantId ? { userRestaurantId: restaurantId } : {};
    return bookingsSchema.find(filter);
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
  async updateBooking(id, updates, updatedBy) {
    updates.updatedBy = new ObjectId(updatedBy);
    return bookingsSchema.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
  },

  /**
   * @function viewBooking
   * @description renders booking details
   * @param {string} id - Booking ID to view
   * @returns {Promise<Object|null>} rendered booking document
   */
  async viewBooking(id) {
    return bookingsSchema.findById(id);
  },

  /**
   * @function updateBooking
   * @description Updates booking with validation.
   *
   * @param {string} id - Booking ID to update
   * @param {Object} updates - Updated fields
   * @param {string} updatedBy - Authenticated user's ID
   * @returns {Promise<Object|null>} Updated booking document
   */
  async updateBooking(id, updates, updatedBy) {
    updates.updatedBy = new ObjectId(updatedBy);
    return bookingsSchema.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
  },
};
