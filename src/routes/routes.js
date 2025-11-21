const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController.js");
const usersHandlers = require("../controllers/usersController.js");
const callLogController = require("../controllers/callLogsController.js");
const menuController = require("../controllers/menuController.js");
const ordersController = require("../controllers/ordersController.js");
const bookingsController = require("../controllers/bookingsController.js");
const feedbacksController = require("../controllers/feedbacksController.js");
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
 * @route POST /feedback/create_feedback
 * @description Create a new feedback entry (table reservation).
 */
router.post("/feedback/create_feedback", UserDecodeJwt, feedbacksController.create_feedback);

/**
 * @route GET /feedback/feedback_list
 * @description Retrieve list of all feedback.
 */
router.get("/feedback/feedback_list", UserDecodeJwt, feedbacksController.feedback_list);

module.exports = router;
