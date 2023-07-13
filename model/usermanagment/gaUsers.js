const { times } = require('async');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const GaPrtUsersSchema = new Schema({
    "UsrEmailAddress": { type: String, unique: true },
    "UsrFullName": String,
    "UsrImage" : String,
    "UsrPassword": String,
    "UsrType": String,
    "rolePermission": String,
    "UsrStatus": String,
    "UsrID": String,
    "UsrDeviceID": String,
    "UsrCityID": String,
    "rolePermission" :String,

}, {
    timestamps: true
});
module.exports = mongoose.model('GaPrtUsers', GaPrtUsersSchema, 'GaPrtUsers');


