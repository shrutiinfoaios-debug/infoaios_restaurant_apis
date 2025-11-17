/**
 * @fileoverview Users Service
 * Handles business logic for:
 * - Fetching user profile
 * - Listing users
 * - Updating user profiles
 */

const usersSchema = require("../models/usersSchema");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
  /**
   * @function getUserProfile
   * @description Returns profile of the requested or authenticated user.
   *
   * @param {string|null} requestedUserId - Optional user_id from body
   * @param {Object|null} authUser - Authenticated user object
   * @returns {Promise<Object|null>} User document or null
   */
  async getUserProfile(requestedUserId, authUser) {
    const userId = requestedUserId || (authUser ? authUser._id : null);
    if (!userId) return null;

    return usersSchema.findOne({ _id: userId });
  },

  /**
   * @function getUsersList
   * @description Returns all users.
   *
   * @returns {Promise<Array>} List of users
   */
  async getUsersList() {
    return usersSchema.find();
  },

  /**
   * @function updateUser
   * @description Updates user profile with validation.
   *
   * @param {string} id - User ID to update
   * @param {Object} updates - Updated fields
   * @param {string} updatedBy - Authenticated user's ID
   * @returns {Promise<Object|null>} Updated user document
   */
  async updateUser(id, updates, updatedBy) {
    updates.updatedBy = new ObjectId(updatedBy);
    return usersSchema.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
  },
};
