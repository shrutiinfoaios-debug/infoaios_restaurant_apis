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
 * @function view_menucategory
 * @description Express controller: renders menucategory detail.
 *
 * @route POST /menucategory/menucategory_view/:id
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
exports.view_menucategory = async (req, res) => {
  try {
    const viewMenucategory = await menuCategoriesService.viewMenucategory(
      req.params.id
    );

    res.status(200).json(viewMenucategory);
  } catch (e) {
    res.status(constants.HTTP_400).json({ message: e.message });
  }
};  

  /**
   * @function update_menucategory
   * @description Express controller: updates a menucategory detail.
   *
   * @route PUT /menucategory/update_menucategory/:id
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  exports.update_menucategory = async (req, res) => {
    try {
      const updatedMenucategory = await menuCategoriesService.updateMenucategory(
        req.params.id,
        req.body,
        req.user._id
      );
  
      res.status(200).json(updatedMenucategory);
    } catch (e) {
      res.status(constants.HTTP_400).json({ message: e.message });
    }
  };

  /**
   * @function delete_menucategory
   * @description Express controller: deletes a menucategory.
   *
   * @route DELETE /menucategory/delete_menucategory/:id
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  exports.delete_menucategory = async (req, res) => {
    try {
      const deletedMenucategory = await menuCategoriesService.deleteMenucategory(
        req.params.id,
        req.user._id
      );
  
      res.status(200).json(deletedMenucategory);
    } catch (e) {
      res.status(constants.HTTP_400).json({ message: e.message });
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

/**
 * @function view_menuitem
 * @description Express controller: renders menuitem detail.
 *
 * @route POST /menuitem/menuitem_view/:id
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
exports.view_menuitem = async (req, res) => {
  try {

    const menuId = req.params.id;

    if (!menuId) {
      return res.status(401).json({ message: "parameter missing" });
    }
    const viewMenuitem = await menuCategoriesService.viewMenuitem(
      menuId
    );
    if(!viewMenuitem || viewMenuitem == null)
      res.status(constants.HTTP_400).json({ message: "No records found "});
    else
      res.status(200).json(viewMenuitem);
  } catch (e) {
    res.status(constants.HTTP_400).json({ message: e.message });
  }
};  

  /**
   * @function update_menuitem
   * @description Express controller: updates a menuitem detail.
   *
   * @route PUT /menuitem/update_menuitem/:id
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  exports.update_menuitem = async (req, res) => {
    try {
      const updatedMenuitem = await menuCategoriesService.updateMenuitem(
        req.params.id,
        req.body,
        req.user._id
      );
  
      res.status(200).json(updatedMenuitem);
    } catch (e) {
      res.status(constants.HTTP_400).json({ message: e.message });
    }
  };

  /**
   * @function delete_menuitem
   * @description Express controller: deletes a menuitem.
   *
   * @route DELETE /menuitem/delete_menuitem/:id
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @returns {Promise<void>}
   */
  exports.delete_menuitem = async (req, res) => {
    try {
      const deletedMenuitem = await menuCategoriesService.deleteMenuitem(
        req.params.id,
        req.user._id
      );
  
      res.status(200).json(deletedMenuitem);
    } catch (e) {
      res.status(constants.HTTP_400).json({ message: e.message });
    } 
  };  
  