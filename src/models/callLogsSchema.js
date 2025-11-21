const mongoose = require('mongoose');
const { Schema } = mongoose;

const callLogsSchema = new Schema({
      userRestaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
      callerName: {
        type: String,
        required: true
      },
      callerNumber: {
        type: String,
        required: true
      },
      callDuration: {
        type: String,
        required: true
      },
      callConversation: {
        type: String,
        required: true
      },
      callType: {
        type: String,
        required: true
      },
      purpose: {
        type: String,
        required: true
      },
      calledAt: {
         type: Date,
         default:Date.now
      }
},{ versionKey: false});

module.exports = mongoose.model('calllogs', callLogsSchema);
