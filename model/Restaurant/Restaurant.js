const { times } = require('async');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const GaRestaurantSchema = new Schema({
    "RestName": String,
    "RestCity": String,
    "RestImage": String,
    "RestEmail": String,
    "RestLatitude": String,
    "RestLongitude": String,
    "RestLocation": String,
    
},
{
timestamps: true
});
module.exports = mongoose.model('GaRestaurant', GaRestaurantSchema, 'GaRestaurant');
