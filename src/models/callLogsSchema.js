const mongoose = require('mongoose');
const { Schema } = mongoose;

const callLogsSchema = new Schema({
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
      },
      createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        default: null
      }
},{ versionKey: false});

module.exports = mongoose.model('calllogs', callLogsSchema);
