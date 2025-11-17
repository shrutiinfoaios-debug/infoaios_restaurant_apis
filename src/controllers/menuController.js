/**
 * @fileoverview Menu Categories Controller
 * Handles Express-level behavior:
 * - Creating menu categories
 * - Listing menu categories
 */

const menuCategoriesService = require("../services/menu.service");
const constants = require("../utils/constants");

/**
 * @function create_menucategory
 * @description Express controller: creates a new menu category.
 *
 * @route POST /menucategory/create_menucategory
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
exports.create_menucategory = async (req, res) => {
  try {
    const createdBy = req.user._id;
    const category = await menuCategoriesService.createCategory(
      req.body,
      createdBy
    );
    res.json(category);
  } catch (error) {
    res
      .status(constants.HTTP_500)
      .json({ message: constants.SOMETHING_WENT_WRONG });
  }
};

/**
 * @function menucategory_list
 * @description Express controller: lists categories of a specific restaurant.
 *
 * @route POST /menucategory/menucategory_list
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 */
exports.menucategory_list = async (req, res, next) => {
  try {
    const restaurantId = req.body.restaurant_id;

    if (!restaurantId) {
      return res.status(401).json({ message: "parameter missing" });
    }

    const categories = await menuCategoriesService.listCategories(restaurantId);

    res.send(categories);
  } catch (error) {
    res
      .status(constants.HTTP_500)
      .json({ message: constants.SOMETHING_WENT_WRONG });
  }
};

/**
 * @function create_menuitem
 * @description Express controller: creates a new menu item.
 *
 * @route POST /menuitem/create_menuitem
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
exports.create_menuitem = async (req, res) => {
  try {
    const createdBy = req.user._id;
    const item = await menuCategoriesService.createMenuItem(req.body, createdBy);
    res.json(item);
  } catch (error) {
    console.log(error)
    res
      .status(constants.HTTP_500)
      .json({ message: constants.SOMETHING_WENT_WRONG });
  }
};

/**
 * @function menuitem_list
 * @description Express controller: lists items grouped by category.
 *
 * @route POST /menuitem/menuitem_list
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 */
exports.menuitem_list = async (req, res, next) => {
  try {
    const { restaurant_id, category_id } = req.body;

    if (!restaurant_id) {
      return res.status(401).json({ message: "parameter missing" });
    }

    const result = await menuCategoriesService.listMenuItems(
      restaurant_id,
      category_id || null
    );

    res.status(200).json(result);
  } catch (error) {
    res
      .status(constants.HTTP_500)
      .json({ message: constants.SOMETHING_WENT_WRONG });
  }
};
