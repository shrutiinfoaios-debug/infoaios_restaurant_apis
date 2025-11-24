/**
 * @fileoverview Table Types Controller
 * Handles Express-level behavior:
 * - Creating table types
 * - Listing table types
 */

const tableTypesService = require("../services/tabletype.service");
const constants = require("../utils/constants");

/**
 * @function create_tabletype
 * @description Express controller: creates a new table type.
 *
 * @route POST /tabletype/create_tabletype
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
exports.create_tabletype = async (req, res) => {
  try {
    const createdBy = req.user._id;
    const type = await tableTypesService.createTabletype(
      req.body,
      createdBy
    );
    res.json(type);
  } catch (error) {
    res
      .status(constants.HTTP_500)
      .json({ message: constants.SOMETHING_WENT_WRONG });
  }
};

/**
 * @function tabletype_list
 * @description Express controller: lists tabletypes.
 *
 * @route POST /tabletype/tabletype_list
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {Promise<void>}
 */
exports.tabletype_list = async (req, res, next) => {
  try {
    
    const tabletypes = await tableTypesService.listTableTypes();

    res.send(tabletypes);
  } catch (error) {
    res
      .status(constants.HTTP_500)
      .json({ message: constants.SOMETHING_WENT_WRONG + error.message });
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
