const { times } = require('async');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const GaRolesSchema = new Schema({
    "roleName": String,
    "roleDescription": String,
    "adminCode": String,
}, {
    timestamps: true
});
module.exports = mongoose.model('GaRoles', GaRolesSchema, 'GaRoles');
