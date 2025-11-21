const mongoose = require('mongoose');
const { Schema } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const bookingsSchema = new Schema({
      userRestaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
      bookingId: {
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
      bookingTime: {
        type: String,
        required: true
      },
      noOfPerson:{
        type : Number,
        required: true
      },
      tableNo: {
        type : Number,
        default: null
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

bookingsSchema.plugin(AutoIncrement, {
  inc_field: 'bookingId'
});
module.exports = mongoose.model('bookings', bookingsSchema);
