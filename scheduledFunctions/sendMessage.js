const CronJob = require("node-cron");
const { models } = require('mongoose');
const Models = require('../model/index')
const dbconfigurl = require('../config/config');
var MongoClient = require('mongodb').MongoClient;
const express = require('express');
const request = require('request');
const app = express();
'use strict';
var cors = require('cors');
var bodyParser = require('body-parser');
var router = express.Router();
const crypto = require('crypto');

var ObjectId = require('mongoose').Types.ObjectId;
exports.initScheduledJobs = () =>  {
 // Every Day at mid Night
 // const scheduledJobFunction = CronJob.schedule("00 00 00 * * *", () => {
  const scheduledJobFunction = CronJob.schedule("*/1 * * * *", () => {
  
    try {
        

          let UsrTypeVal="GUEST";
          const agg = [
              { $match: {  UsrType: { $regex: UsrTypeVal } } },
          ];
            Models.GaPrtUsersSchema
          .aggregate(agg)
          .then((docs,count) => 
          {

            if (docs.length==0)
             {

             }
            else
            {
                    docs.forEach(element => {
                      let WelcomeMsg="Hello " + element.UsrFullName +" Welcome To Restaurant";
                      console.log(WelcomeMsg);
                      //sendMessage(element.DeviceID, WelcomeMsg);
                    });

                }

            });

        } catch (e) {
        next(e);
    }



  });
  scheduledJobFunction.start();
}