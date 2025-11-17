/**
 * @fileoverview Bookings Controller
 * Handles Express-level behavior for:
 * - Creating bookings
 * - Listing bookings
 */

const bookingsService = require("../services/bookings.service");
const constants = require("../utils/constants");

/**
 * @function create_booking
 * @description Express controller: creates a new booking.
 *
 * @route POST /booking/create_booking
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
exports.create_booking = async (req, res) => {
  try {
    const ip = req.ip.split(":").slice(-1)[0];
    const booking = await bookingsService.createBooking(
      req.body,
      req.user._id,
      ip
    );
    res.json(booking);
  } catch (error) {
    res
      .status(constants.HTTP_500)
      .json({ message: constants.SOMETHING_WENT_WRONG });
  }
};

/**
 * @function booking_list
 * @description Express controller: returns all bookings (optional filter).
 *
 * @route GET /booking/booking_list
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 */
exports.booking_list = async (req, res, next) => {
  try {
    const restaurantId = req.query.restaurantId || null;
    const bookings = await bookingsService.listBookings(restaurantId);
    res.send(bookings);
  } catch (error) {
    res
      .status(constants.HTTP_500)
      .json({ message: constants.SOMETHING_WENT_WRONG });
  }
};
