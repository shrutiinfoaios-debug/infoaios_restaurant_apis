const express = require('express');
const router = express.Router();
var usersHandlers = require('../controllers/usersController.js');

router.post('/user_profile', usersHandlers.loginRequired, usersHandlers.profile);
router.post('/register',usersHandlers.register);
router.post('/sign_in',usersHandlers.sign_in);

module.exports = router;