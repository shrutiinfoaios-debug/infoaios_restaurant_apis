const express = require('express');
const router = express.Router();
var usersHandlers = require('../controllers/usersController.js');
const callLogController = require('../controllers/callLogsController.js');
const menuCategoryController = require('../controllers/menuCategoriesController.js');
const menuItemsController = require('../controllers/menuItemsController.js');

router.post('/auth/user_profile', usersHandlers.loginRequired, usersHandlers.profile);
router.get('/auth/users_list', usersHandlers.loginRequired, usersHandlers.usersList);
router.put('/auth/change_password', usersHandlers.loginRequired, usersHandlers.changePassword);
router.post('/auth/register',usersHandlers.register);
router.post('/auth/sign_in',usersHandlers.sign_in);

router.post('/calllog/create_calllog', usersHandlers.loginRequired, callLogController.create_calllog);
router.get('/calllog/calllog_list', usersHandlers.loginRequired, callLogController.calllog_list);

router.post('/menucategory/create_menucategory', usersHandlers.loginRequired, menuCategoryController.create_menucategory);
router.post('/menucategory/menucategory_list', usersHandlers.loginRequired, menuCategoryController.menucategory_list);

router.post('/menuitem/create_menuitem', usersHandlers.loginRequired, menuItemsController.create_menuitem);
router.post('/menuitem/menuitem_list', usersHandlers.loginRequired, menuItemsController.menuitem_list);

module.exports = router;