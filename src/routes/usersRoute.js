const express = require('express');
const router = express.Router();
var usersHandlers = require('../controllers/usersController.js');
const callLogController = require('../controllers/callLogsController.js');
const menuCategoryController = require('../controllers/menuCategoriesController.js');
const menuItemsController = require('../controllers/menuItemsController.js');
const ordersController = require('../controllers/ordersController.js');
const bookingsController = require('../controllers/bookingsController.js')

router.post('/auth/user_profile', usersHandlers.loginRequired, usersHandlers.profile);
router.get('/auth/users_list', usersHandlers.loginRequired, usersHandlers.usersList);
router.put('/auth/change_password', usersHandlers.loginRequired, usersHandlers.changePassword);
router.post('/auth/register',usersHandlers.register);
router.post('/auth/sign_in',usersHandlers.sign_in);
router.put('/auth/update_user_profile/:id',usersHandlers.loginRequired, usersHandlers.updateUserProfile);

router.post('/calllog/create_calllog', usersHandlers.loginRequired, callLogController.create_calllog);
router.get('/calllog/calllog_list', usersHandlers.loginRequired, callLogController.calllog_list);

router.post('/menucategory/create_menucategory', usersHandlers.loginRequired, menuCategoryController.create_menucategory);
router.post('/menucategory/menucategory_list', usersHandlers.loginRequired, menuCategoryController.menucategory_list);

router.post('/menuitem/create_menuitem', usersHandlers.loginRequired, menuItemsController.create_menuitem);
router.post('/menuitem/menuitem_list', usersHandlers.loginRequired, menuItemsController.menuitem_list);

router.post('/order/create_order', usersHandlers.loginRequired, ordersController.create_order);
router.get('/order/order_list', usersHandlers.loginRequired, ordersController.order_list);

router.post('/booking/create_booking', usersHandlers.loginRequired, bookingsController.create_booking);
router.get('/booking/booking_list', usersHandlers.loginRequired, bookingsController.booking_list);

module.exports = router ;