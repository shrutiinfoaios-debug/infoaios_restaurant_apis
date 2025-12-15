const mongoose = require('mongoose');
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
      isDeleted: {
        type: Boolean,
        default: false
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
          },
      updatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        default: null
      },
      deletedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        default: null
      }    
},{ versionKey: false});

module.exports = mongoose.model('menucategories', menuCategoriesSchema);
