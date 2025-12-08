/**
 * @fileoverview Menu Categories Service
 * Handles business logic for:
 * - Creating categories
 * - Listing categories by restaurant
 */

const menuCategoriesSchema = require("../models/menuCategoriesSchema");
const menuItemsSchema = require("../models/menuItemsSchema");
const menuItemSchema = require("../models/menuItemsSchema");
const mongoose = require("mongoose");

module.exports = {
  /**
   * @function createCategory
   * @description Creates a new restaurant menu category.
   *
   * @param {Object} data - Category creation data
   * @param {string} createdBy - Authenticated user ID
   * @returns {Promise<Object>} Created category document
   */
  async createCategory(data, createdBy) {
    const category = new menuCategoriesSchema({
      ...data,
      createdBy,
    });

    return await category.save();
  },

  /**
   * @function listCategories
   * @description Retrieves categories belonging to a restaurant.
   *
   * @param {string|null} restaurantId - Restaurant ID
   * @returns {Promise<Array>} Array of categories
   */
  async listCategories(restaurantId) {
    if (!restaurantId) return null;
    return menuCategoriesSchema.find({ userRestaurantId: restaurantId });
  },

  /**
     * @function viewMenucategory
     * @description renders menucategory details
     * @param {string} id - menucategory ID to view
     * @returns {Promise<Object|null>} rendered menucategory document
     */
    async viewMenucategory(id) {
      return menuCategoriesSchema.findById(id);
    },

  
  
  /**
     * @function updateMenucategory
     * @description Updates menucategory with validation.
     *
     * @param {string} id - Menucategory ID to update
     * @param {Object} updates - Updated fields
     * @param {string} updatedBy - Authenticated user's ID
     * @returns {Promise<Object|null>} Updated menucateory document
     */
    async updateMenucategory(id, updates, updatedBy) {
      updates.updatedBy = new ObjectId(updatedBy);
      return menuCategoriesSchema.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });
    },


    /**
     * @function deleteMenucategory
     * @description Deletes menucatgeory with validation.
     *
     * @param {string} id - Menucategory ID to delete
     * @param {string} deletedBy - Authenticated user's ID
     * @returns {Promise<Object|null>} Deleted menucategory message
     */
    async deleteMenucategory(id, deletedBy) {
      updates = {}
      updates.deletedBy = new ObjectId(deletedBy);
      updates.isDeleted = true;
      return menuCategoriesSchema.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });
    },


  /**
   * @param {string} createdBy - Authenticated user ID
   * @returns {Promise<Object>} Created menu item
   */
  async createMenuItem(data, createdBy) {
    const item = new menuItemSchema({
      ...data,
      createdBy,
    });

    return await item.save();
  },

  /**
   * @function listMenuItems
   * @description Returns grouped menu items based on restaurant & category.
   *
   * @param {string} restaurantId - Restaurant ID
   * @param {string|null} categoryId - Optional category ID
   * @returns {Promise<Array>} Aggregated result of categories + items
   */
  async listMenuItems(restaurantId, categoryId = null) {
    const ObjectId = mongoose.Types.ObjectId;

    let menuItemListMatch = {};
    let menuCategoryListMatch = {
      userRestaurantId: new ObjectId(restaurantId),
    };

    if (categoryId) {
      menuItemListMatch = {
        categoryId: new ObjectId(categoryId),
      };

      menuCategoryListMatch = {
        userRestaurantId: new ObjectId(restaurantId),
        _id: new ObjectId(categoryId),
      };
    }

    return menuCategoriesSchema.aggregate([
      { $match: menuCategoryListMatch },
      {
        $lookup: {
          from: "menuitems",
          localField: "_id",
          foreignField: "categoryId",
          as: "menulist",
          pipeline: [{ $match: menuItemListMatch }],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userRestaurantId",
          foreignField: "_id",
          as: "restaurantDetails",
          pipeline: [
            {
              $project: {
                restaurantName: 1,
                restaurantAddress: 1,
              },
            },
          ],
        },
      },
    ]);
  },

    /**
     * @function viewMenuitem
     * @description renders menuitem details
     * @param {string} id - menuitem ID to view
     * @returns {Promise<Object|null>} rendered menuitem document
     */
    async viewMenuitem(id) {
      return menuItemsSchema.findById(id);
    },

  
  
  /**
     * @function updateMenuitem
     * @description Updates menuitem with validation.
     *
     * @param {string} id - Menuitem ID to update
     * @param {Object} updates - Updated fields
     * @param {string} updatedBy - Authenticated user's ID
     * @returns {Promise<Object|null>} Updated menuitem document
     */
    async updateMenuitem(id, updates, updatedBy) {
      updates.updatedBy = new ObjectId(updatedBy);
      return menuItemsSchema.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });
    },


    /**
     * @function deleteMenuitem
     * @description Deletes menuitem with validation.
     *
     * @param {string} id - Menuitem ID to delete
     * @param {string} deletedBy - Authenticated user's ID
     * @returns {Promise<Object|null>} Deleted menuitem message
     */
    async deleteMenuitem(id, deletedBy) {
      updates = {}
      updates.deletedBy = new ObjectId(deletedBy);
      updates.isDeleted = true;
      return menuItemsSchema.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });
    },
};
