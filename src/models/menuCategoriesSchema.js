const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const menuCategoriesSchema = new Schema({
      userRestaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
      categoryName: {
        type: String,
        required: true
      },
      status: {
        type: String,
        required: true
      },
      createdAt: {
         type: Date,
         default:Date.now
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', 
        default: null
          }
},{ versionKey: false});

module.exports = mongoose.model('menucategories', menuCategoriesSchema);
