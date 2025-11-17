/**
 * @fileoverview Authentication Controller
 * Handles Express-level behavior for:
 * - Registering a user
 * - Logging in
 * - Changing password
 * - Token decoding middleware
 *
 * Delegates all logic to auth.service.js
 */
const authService = require('../services/auth.service');
const jwtSecretToken = process.env.JWT_SECRET_ACCESS_TOKEN;
const jwtTokenExpiresDays = process.env.JWT_EXPIRES_DAYS;
const constants = require('../utils/constants')

module.exports.UserDecodeJwt = function (req, res, next) {
  /**
   * @function UserDecodeJwt
   * @description Express middleware for validating JWT tokens.
   *
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  try {
    const authHeader = req.headers?.authorization;
    if (!authHeader || !authHeader.startsWith('JWT ')) {
      return res.status(401).json({ message: 'Unauthorized user!' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = authService.decodeToken(token, jwtSecretToken);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired token!' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};

module.exports.register = async function (req, res) {
  /**
   * @function register
   * @description Registers a new user.
   *
   * @param {express.Request} req
   * @param {express.Response} res
   */
  try {
    const ip = req.ip.split(':').slice(-1)[0];
    const user = await authService.registerUser(req.body, ip, req.user?._id);
    res.json(user);
  } catch (error) {
    res.status(constants.HTTP_400).json({ message: error.message });
  }
};

module.exports.sign_in = async function (req, res) {
  /**
   * @function sign_in
   * @description Authenticates user credentials and returns JWT.
   *
   * @param {express.Request} req
   * @param {express.Response} res
   */
  try {
    if (!req.body.userRoleType) {
      return res.status(401).json({ message: 'Userrole type is missing' });
    }

    const token = await authService.login(
      req.body,
      jwtSecretToken,
      jwtTokenExpiresDays
    );

    if (!token) {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }

    res.json({ token });
  } catch (error) {
    res.status(constants.HTTP_500).json({ message: constants.SOMETHING_WENT_WRONG });
  }
};

module.exports.changePassword = async function (req, res) {
  /**
   * @function changePassword
   * @description Allows the user to update their password.
   *
   * @param {express.Request} req
   * @param {express.Response} res
   */
  try {
    const { old_password, new_password } = req.body;
    if (!old_password || !new_password) {
      return res.status(constants.HTTP_400).json({ message: 'parameter missing' });
    }

    const changed = await authService.changePassword(
      req.user._id,
      old_password,
      new_password
    );

    if (!changed) {
      return res.status(401).json({ message: 'Authentication failed. Invalid password.' });
    }

    res.status(200).json({ message: 'Password changed successfully.' });
  } catch (error) {
    res.status(constants.HTTP_500).json({ message: constants.SOMETHING_WENT_WRONG });
  }
};
