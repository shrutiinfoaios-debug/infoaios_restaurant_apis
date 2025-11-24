// usersschema.js
const mongoose = require('mongoose');
const { Schema } = mongoose;
const TableTypesSchema = new Schema({
    typeName: {
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

module.exports = mongoose.model('tabletypes', TableTypesSchema);