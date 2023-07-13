const { models } = require('mongoose');
const Models = require('../../../model/index')
const dbconfigurl = require('../../../config/config');
var MongoClient = require('mongodb').MongoClient;
const express = require('express');
const request = require('request');
const app = express();
'use strict';
var cors = require('cors');
var bodyParser = require('body-parser');
var router = express.Router();
const crypto = require('crypto');
 
exports.getResturant = async (req, res, next) => {

  Models.GaRestaurantSchema.find({}).then((docs) => {

        if (docs.length==0)
        {
            res.send({
                status: 400,
                data: resp,
                msg: 'No Resturant found '
            })
        }
        else
        {
        let mainArray = []
        docs.forEach(element => {

            
            let obj = {
                "_id": element._id,
                "RestName": element.RestName,
                "RestCity": element.RestCity,
                "RestLocation": element.RestLocation,
                "RestEmail": element.RestEmail,
                "RestImage": process.env.URL+element.RestImage,
                "RestLatitude": element.RestLatitude,
                "RestLongitude": element.RestLongitude,
            }


            mainArray.push(obj);
        });
        mainArray.sort(function (a, b) { return (a.distance - b.distance); });
        return res.json({ message: "success", statusCode: 200, count: mainArray.length, data:  mainArray  });
        }

  }).catch((err) => {

  }).finally(() => {

  });

}

exports.addResturant = async (req, res, next) => {
  let getData = req.body;
  try {
      let obj = 
      {
          "RestName": getData.RestName,
          "RestCity": getData.RestCity,
          "RestImage": getData.RestImage,
          "RestEmail": getData.RestEmail,
          "RestLocation": getData.RestLocation,
          "RestLatitude": getData.RestLatitude,
          "RestLongitude": getData.RestLongitude,
           
      }
      await Models.GaRestaurantSchema.create(obj).then(
          resp => {
              res.send({
                  statusCode : 200,
                  data: resp,
                  message: 'data Sucessfully Updated'
              })
          });

  } catch (e) {
      next(e);
  }
}
exports.updResturant = async (req, res, next) => {
  try {
      let getData = req.body;
      var query = { "_id": req.body._id };
      var options = { new: true };
      var update = {
        "RestName": getData.RestName,
        "RestCity": getData.RestCity,
        "RestImage": getData.RestImage,
        "RestEmail": getData.RestEmail,
        "RestLocation": getData.RestLocation,
        "RestLatitude": getData.RestLatitude,
        "RestLongitude": getData.RestLongitude,
      };
      await Models.GaRestaurantSchema.findOneAndUpdate(query, update, options).then(
          resp => {
              if (resp != null) {
                  res.send({
                      statusCode: 200,
                      data: resp,
                      msg: 'Resturant Sucessfully Updated'
                  })
              } else {
                  res.send({
                      status: 400,
                      data: resp,
                      msg: 'No Resturant found with realated id'
                  })
              }

          });

  } catch (e) {
      next(e);
  }
}

exports.delResturant = async (req, res, next) => {
    
  try {
      //var query = { _id: new ObjectId(req.body._id)};
      var query = { "_id": req.body._id };
      await Models.GaRestaurantSchema.findByIdAndDelete(query).then(
          resp => {
              if (resp != null) {
                  res.send({
                      statusCode: 200,
                      data: resp,
                      msg: 'Resturant deleted successfully'
                  })
              } else {
                  res.send({
                      statusCode: 400,
                      data: resp,
                      msg: 'No data found with realated id'
                  })
              }

          });

  } catch (e) {
      next(e);
  }


}

exports.searchResturant = async (req, res, next) => 
{
    let RestNameVal=req.body.RestName;
    const agg = [
        { $match: {  RestName: { $regex: RestNameVal } } },
    ];
    await Models.GaRestaurantSchema
    .aggregate(agg)
    .then((docs,count) => 
    {
        
       
        if (docs.length==0)
        return res.json({ message: "No Restaurant found", statusCode: 400   });
        else
        {
            let mainArray = []
            docs.forEach(element => {

                
                let obj = {
                    "_id": element._id,
                    "RestName": element.RestName,
                    "CityName": element.RestCity,
                    "Location": element.RestLocation,
                    "RestEmail": element.RestEmail,
                    "RestImage": process.env.URL+element.RestImage,
                    "RestLatitude": element.RestLatitude,
                    "RestLongitude": element.RestLongitude,
                }


                mainArray.push(obj);
            });
            mainArray.sort(function (a, b) { return (a.distance - b.distance); });
            return res.json({ message: "success", statusCode: 200, count: mainArray.length, data:  mainArray  });
        }

    }).catch((err) => 
    {
    }).finally(() => 
    {
    });
        
}
 
exports.nearResturant= async (req, res, next) => {

    var userGmaplatVal = req.body.RestLatitude;
    var userGmaplanVal = req.body.RestLongitude;
      
    try {

        await  Models.GaRestaurantSchema.find({}).then((docs,count) => 
         {
               
            if (docs.length==0)
            return res.json({ message: "No Restaurant found", statusCode: 400   });
            else
            {
    
                    
                    let mainArray = []
                    docs.forEach(element => {

                        
                        let obj = {
                            "_id": element._id,
                            "RestName": element.RestName,
                            "CityName": element.RestCity,
                            "Location": element.RestLocation,
                            "RestEmail": element.RestEmail,
                            "RestImage": process.env.URL+element.RestImage,
                            "RestLatitude": element.RestLatitude,
                            "RestLongitude": element.RestLongitude,
                            "distance": getDistanceFromLatLonInKm(element.RestLatitude, element.RestLongitude, userGmaplatVal, userGmaplanVal),
                        }


                        mainArray.push(obj);
                    });
                    mainArray.sort(function (a, b) { return (a.distance - b.distance); });
                    return res.json({ message: "success", statusCode: 200, count: mainArray.length, data:  mainArray  });

                }

            });




    } catch (e) {
        next(e);
    }
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    d = d * 1000; //distance in meter
    return d;
}
function deg2rad(deg) {
    return deg * (Math.PI/180)
  }