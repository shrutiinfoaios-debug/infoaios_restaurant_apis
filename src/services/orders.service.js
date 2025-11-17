/**
* @fileoverview Orders Service
* Handles business logic:
* - Creating restaurant orders
* - Listing restaurant orders
*/


const ordersSchema = require('../models/ordersSchema');


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
return ordersSchema.find(filter);
}
};