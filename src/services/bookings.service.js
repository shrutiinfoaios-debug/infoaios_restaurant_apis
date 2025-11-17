/**
* @fileoverview Bookings Service
* Handles business logic for:
* - Creating bookings
* - Listing bookings
*/


const bookingsSchema = require('../models/bookingsSchema');


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
}
};