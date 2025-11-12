const mongoose = require('mongoose');
const { Schema } = mongoose;

const ordersSchema = new Schema({
      userRestaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
      orderId: {
        type: String,
        required: true
      },
      customerName: {
        type: String,
        required: true
      },
      customerPhone: {
        type: String,
        required: true
      },
      tableNumber: {
        type: String,
        required: true
      },
      orderedItems:{
        type : Array,
        required: true
      },
      totalBill:{
        type: Number,
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
      createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        default: null
      }
},{ versionKey: false});

module.exports = mongoose.model('orders', ordersSchema);
