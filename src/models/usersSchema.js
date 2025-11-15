// usersschema.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const UsersSchema = new Schema({
    username: {
                type: String,
                trim: true,
                required: true
              },
    email: {
                type: String,
                trim: true,
                required: true
            },
    passwordHash: {
                type: String,
                trim: true,
                required: true
            },       
    phoneNumber: {
                type: String,
                trim: true,
                required: true
            },
    userrole: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'userroles',
                required: true
    },        
    restaurantName: {
                type: String,
                trim: true
            },
    restaurantAddress: {
                type: String,
                trim: true
            },
    noOfTables: {
        type: Number,
        default: null
    },        
    ipAddress: {
        type: String,
        trim: true 
    },     
    createdAt: {
                type: Date,
                default:Date.now
    },
    createdBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'userroles', 
                default: null
    },
    updatedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'userroles', 
                default: null
    }
},{ versionKey: false});

UsersSchema.methods.comparePassword = function(password) {
return bcrypt.compareSync(password, this.passwordHash);
};

module.exports = mongoose.model('users', UsersSchema);


    