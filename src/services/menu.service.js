/**
 * @fileoverview Menu Categories Service
 * Handles business logic for:
 * - Creating categories
 * - Listing categories by restaurant
 */

const menuCategoriesSchema = require("../models/menuCategoriesSchema");

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
   * @param {string} createdBy - Authenticated user ID
   * @returns {Promise<Object>} Created menu item
   */
  async createMenuItem(data, createdBy) {
    const item = new menuItemsSchema({
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
};
