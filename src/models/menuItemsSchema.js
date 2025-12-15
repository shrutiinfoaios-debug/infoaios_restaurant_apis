const mongoose = require('mongoose');
const { Schema } = mongoose;

const menuItemsSchema = new Schema({
      categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menucategories',
        required: true
      },
      itemName: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      status: {
        type: String,
        required: true
      },
      isDeleted: {
        type: Boolean,
        default: false
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

module.exports = mongoose.model('menuitems', menuItemsSchema);
