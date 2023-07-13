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
const jwt = require("jsonwebtoken");

exports.verifyIsAdminUser= async (req, res, next) => {
        let token = req.headers["x-access-token"] || req.headers["authorization"];
        this.accessToken = token.replace('Bearer ', '');
        const decodedToken = jwt.decode(this.accessToken);
        let emailaddressVal =decodedToken['userEmail']
        var query = { "UsrEmailAddress": emailaddressVal,  };
        await Models.GaPrtUsersSchema.find(query).exec((err, docs) => {
        if (err) {
        return res.json(err);
        } else {
                //console.log("query");
                //console.log(query);
                //console.log(element.UsrType);
                docs.forEach(element => {
                if (element.UsrType != "ADMIN")
                {
                        return res.json({ message: "Sorry ! you do not have access ", statusCode: 400,   data:  null  });
                }
                else
                {
                        next();
                }

                }); 
        }
        });
}
exports.VerifyDuplicateUser= async (req, res, next) => {
        let emailaddressVal =req.body.UsrEmailAddress;
        var query = { "UsrEmailAddress": emailaddressVal,  };
        await Models.GaPrtUsersSchema.find(query).exec((err, docs) => {
                if (err) {
                return res.json(err);
                } else {
                        
                        if (docs.length != 0)
                        return res.json({ message: "Sorry ! Duplicate Email Address ", statusCode: 400,   data:  null  });
                        else
                        next(); 
                }
        });
}