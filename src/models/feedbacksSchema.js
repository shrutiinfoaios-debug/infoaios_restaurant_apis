const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedbacksSchema = new Schema({
      userRestaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
      orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders',
        default: null
      },
      rating: {
        type: Number,
        required: true
      },
      comment:{
        type: String 
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

module.exports = mongoose.model('feedbacks', feedbacksSchema);
