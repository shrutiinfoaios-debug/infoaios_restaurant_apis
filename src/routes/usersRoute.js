const express = require('express');
const router = express.Router();
var usersHandlers = require('../controllers/usersController.js');
const callLogController = require('../controllers/callLogsController.js');

router.post('/auth/user_profile', usersHandlers.loginRequired, usersHandlers.profile);
router.get('/auth/users_list', usersHandlers.loginRequired, usersHandlers.usersList);
router.put('/auth/change_password', usersHandlers.loginRequired, usersHandlers.changePassword);
router.post('/auth/register',usersHandlers.register);
router.post('/auth/sign_in',usersHandlers.sign_in);


router.post('/calllog/create_calllog', usersHandlers.loginRequired, callLogController.create_calllog);
router.post('/calllog/calllog_list', usersHandlers.loginRequired, callLogController.calllog_list);
module.exports = router;