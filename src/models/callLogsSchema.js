const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const callLogSchema = new Schema({
      userRestaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
      callerNumber: {
        type: String,
        required: true
      },
      receiverNumber: {
        type: String,
        required: true
      },
      duration: {
        type: String,
        required: true
      },
      callType: {
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
      }
},{ versionKey: false});

module.exports = mongoose.model('calllogs', callLogSchema);
