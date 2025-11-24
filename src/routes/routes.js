const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController.js");
const usersHandlers = require("../controllers/usersController.js");
const callLogController = require("../controllers/callLogsController.js");
const menuController = require("../controllers/menuController.js");
const ordersController = require("../controllers/ordersController.js");
const bookingsController = require("../controllers/bookingsController.js");
const feedbacksController = require("../controllers/feedbacksController.js");
const tableTypesController = require("../controllers/tableTypesController.js");
const { UserDecodeJwt } = require("../controllers/authController.js");

/**
 * @fileoverview
 * Defines all REST API routes for:
 * - Authentication & User Management
 * - Call Logs
 * - Menu
 * - Orders
 * - Bookings
 *
 * Each route is mapped to its respective controller function.
 */

/* -------------------------------------------------------------------------- */
/*                               AUTH / USERS                                  */
/* -------------------------------------------------------------------------- */

/**
 * @route POST /auth/user_profile
 * @description Get the profile of the logged-in user.
 */
router.post("/auth/user_profile", UserDecodeJwt, usersHandlers.profile);

/**
 * @route GET /auth/users_list
 * @description Fetch the list of all users.
 */
router.get("/auth/users_list", UserDecodeJwt, usersHandlers.usersList);

/**
 * @route PUT /auth/change_password
 * @description Change user password.
 */
router.put("/auth/change_password", UserDecodeJwt, authController.changePassword);

/**
 * @route POST /auth/register
 * @description Register a new user.
 */
router.post("/auth/register", authController.register);

/**
 * @route POST /auth/sign_in
 * @description Authenticate user and return login token.
 */
router.post("/auth/sign_in", authController.sign_in);

/**
 * @route PUT /auth/update_user_profile/:id
 * @description Update profile information of a specific user.
 * @param {string} id - User ID
 */
router.put("/auth/update_user_profile/:id", UserDecodeJwt, usersHandlers.updateUserProfile);

/* -------------------------------------------------------------------------- */
/*                                 CALL LOGS                                   */
/* -------------------------------------------------------------------------- */

/**
 * @route POST /calllog/create_calllog
 * @description Create a new call log entry.
 */
router.post("/calllog/create_calllog", UserDecodeJwt, callLogController.create_calllog);

/**
 * @route GET /calllog/calllog_list
 * @description Retrieve list of call logs.
 */
router.get("/calllog/calllog_list", UserDecodeJwt, callLogController.calllog_list);

/* -------------------------------------------------------------------------- */
/*                           MENU CATEGORIES                                   */
/* -------------------------------------------------------------------------- */

/**
 * @route POST /menucategory/create_menucategory
 * @description Create a new menu category.
 */
router.post(
  "/menucategory/create_menucategory",
  UserDecodeJwt,
  menuController.create_menucategory
);

/**
 * @route POST /menucategory/menucategory_list
 * @description Retrieve list of menu categories.
 */
router.post(
  "/menucategory/menucategory_list",
  UserDecodeJwt,
  menuController.menucategory_list
);

/* -------------------------------------------------------------------------- */
/*                               MENU ITEMS                                    */
/* -------------------------------------------------------------------------- */

/**
 * @route POST /menuitem/create_menuitem
 * @description Create a new menu item.
 */
router.post("/menuitem/create_menuitem", UserDecodeJwt, menuController.create_menuitem);

/**
 * @route POST /menuitem/menuitem_list
 * @description Retrieve list of menu items.
 */
router.post("/menuitem/menuitem_list", UserDecodeJwt, menuController.menuitem_list);

/* -------------------------------------------------------------------------- */
/*                                  ORDERS                                     */
/* -------------------------------------------------------------------------- */

/**
 * @route POST /order/create_order
 * @description Create a new order for a customer.
 */
router.post("/order/create_order", UserDecodeJwt, ordersController.create_order);

/**
 * @route GET /order/order_list
 * @description Retrieve list of all orders.
 */
router.get("/order/order_list", UserDecodeJwt, ordersController.order_list);

/**
 * @route POST /order/view_order/:id
 * @description Create a new order for a customer.
 */
router.post("/order/view_order/:id", UserDecodeJwt, ordersController.view_order);

/**
 * @route PUT /order/update_order/:id
 * @description Update order information of a specific order.
 * @param {string} id - Order ID
 */
router.put("/order/update_order/:id", UserDecodeJwt, ordersController.update_order);

/**
 * @route DELETE /order/delete_order/:id
 * @description Delete a order for a restaurant table.
 */
router.delete("/order/delete_order/:id", UserDecodeJwt, ordersController.delete_order);

/* -------------------------------------------------------------------------- */
/*                                 BOOKINGS                                    */
/* -------------------------------------------------------------------------- */

/**
 * @route POST /booking/create_booking
 * @description Create a new booking entry (table reservation).
 */
router.post("/booking/create_booking", UserDecodeJwt, bookingsController.create_booking);

/**
 * @route GET /booking/booking_list
 * @description Retrieve list of all bookings.
 */
router.get("/booking/booking_list", UserDecodeJwt, bookingsController.booking_list);

/**
 * @route POST /booking/view_booking/:id
 * @description Create a new booking for a customer.
 */
router.post("/booking/view_booking/:id", UserDecodeJwt, bookingsController.view_booking);

/**
 * @route PUT /booking/update_booking/:id
 * @description Update booking information of a specific booking.
 * @param {string} id - booking ID
 */
router.put("/booking/update_booking/:id", UserDecodeJwt, bookingsController.update_booking);

/**
 * @route DELETE /booking/delete_booking/:id
 * @description Delete a booking for a restaurant table.
 */
router.delete("/booking/delete_booking/:id", UserDecodeJwt, bookingsController.delete_booking);

/* -------------------------------------------------------------------------- */
/*                                 FEEDBACKS                                    */
/* -------------------------------------------------------------------------- */
/**
 * @route POST /feedback/create_feedback
 * @description Create a new feedback entry (table reservation).
 */
router.post("/feedback/create_feedback", UserDecodeJwt, feedbacksController.create_feedback);

/**
 * @route GET /feedback/feedback_list
 * @description Retrieve list of all feedback.
 */
router.get("/feedback/feedback_list", UserDecodeJwt, feedbacksController.feedback_list);

/**
 * @route PUT /feedback/hide_show_feedback
 * @description Hide or Show feedback.
 */
router.put("/feedback/hide_show_feedback/:id", UserDecodeJwt, feedbacksController.hide_show_feedback);

/* -------------------------------------------------------------------------- */
/*                                 TABLETYPE                                    */
/* -------------------------------------------------------------------------- */
/**
 * @route POST /tabletype/create_tableType
 * @description Create a new tableType entry (table reservation).
 */
router.post("/tabletype/create_tabletype", UserDecodeJwt, tableTypesController.create_tabletype);

/**
 * @route GET /tabletype/tabletype_list
 * @description Retrieve list of all tabletypes.
 */
router.get("/tabletype/tabletype_list", UserDecodeJwt, tableTypesController.tabletype_list);


module.exports = router;
