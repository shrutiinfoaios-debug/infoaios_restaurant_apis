/**
 * @fileoverview Table Type Service
 * Handles business logic for:
 * - Creating tabletype
 * - Listing tabletype for restaurant
 */

const tableTypesSchema = require("../models/tableTypes");
const mongoose = require("mongoose");

module.exports = {
  /**
   * @function createTableTypes
   * @description Creates a table type.
   *
   * @param {Object} data - Category creation data
   * @param {string} createdBy - Authenticated user ID
   * @returns {Promise<Object>} Created tabletype document
   */
  async createTabletype(data, createdBy) {
    const tableType = new tableTypesSchema({
      ...data,
      createdBy,
    });

    return await tableType.save();
  },

  /**
   * @function listTableTypes
   * @description Retrieves TableType belonging to a restaurant.
   *
   * @returns {Promise<Array>} Array of tableTypes
   */
  async listTableTypes() {
   return tableTypesSchema.find();
  },
};
