/**
 * @fileoverview Users Controller
 * Handles Express behavior:
 * - Fetching user profiles
 * - Listing all users
 * - Updating user profiles
 */

const usersService = require("../services/users.service");
const constants = require("../utils/constants");

/**
 * @function profile
 * @description Express controller: returns user profile for provided user_id or authenticated user.
 *
 * @route POST /auth/user_profile
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
exports.profile = async (req, res) => {
  try {
    const user = await usersService.getUserProfile(req.body.user_id, req.user);
    if (!user) return res.status(401).json({ message: "Invalid token" });
    res.send(user);
  } catch (error) {
    res
      .status(constants.HTTP_500)
      .json({ message: constants.SOMETHING_WENT_WRONG });
  }
};

/**
 * @function usersList
 * @description Express controller: returns list of all users.
 *
 * @route GET /auth/users_list
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
exports.usersList = async (req, res) => {
  try {
    const users = await usersService.getUsersList();
   // res.send(users);
    res.send("Hello ");
  } catch (error) {
    res
      .status(constants.HTTP_500)
      .json({ message: constants.SOMETHING_WENT_WRONG });
  }
};

/**
 * @function updateUserProfile
 * @description Express controller: updates a user's profile.
 *
 * @route PUT /auth/update_user_profile/:id
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
exports.updateUserProfile = async (req, res) => {
  try {
    const updatedUser = await usersService.updateUser(
      req.params.id,
      req.body,
      req.user._id
    );

    res.status(200).json(updatedUser);
  } catch (e) {
    res.status(constants.HTTP_400).json({ message: e.message });
  }
};
