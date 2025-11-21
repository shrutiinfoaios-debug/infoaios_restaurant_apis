const mongoose = require('mongoose');
const { Schema } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ordersSchema = new Schema({
      userRestaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
      orderId: {
        type: Number
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
      isDeleted: {
        type: Boolean,
        default: false
      },
      createdAt: {
         type: Date,
         default:Date.now
      },
      createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
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

ordersSchema.plugin(AutoIncrement, {
  inc_field: 'orderId'
});
module.exports = mongoose.model('orders', ordersSchema);
