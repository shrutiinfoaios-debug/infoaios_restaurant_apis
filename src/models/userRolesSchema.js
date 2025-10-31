// usersschema.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const UserRolesSchema = new Schema({
    roleType: {
                type: Number,
                required: true
              },
    roleName: {
                type: String,
                trim: true,
                required: true
            },
    status: {
                type: Boolean,
                default: true,
                required: true
            },   
    createdAt: {
                type: Date,
                default:Date.now
    }
},{ versionKey: false});

module.exports = mongoose.model('userroles', UserRolesSchema);