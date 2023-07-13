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
const { generateToken, generateTokenThirdparty } = require('../../../helpers/tokenManagment')
var ObjectId = require('mongoose').Types.ObjectId;

exports.addAccount = async (req, res, next) => {
    let getData = req.body;
    var query = { "adminCode" : "1"  };
    await Models.GaRolesSchema.findOne(query).exec((err, docRole) => {
        if (err) 
        {
        return res.json(err);
        } 
        else
        {             
                try 
                { 
                        let getData = req.body;
                        let UserEmailAddressVal;
                        let UserPasswordVal;

                        UserEmailAddressVal=getData.UsrEmailAddress;
                        UserPasswordVal=getData.UsrPassword;
                        const secret = UserEmailAddressVal + UserPasswordVal;
                        const pwdkeyVal = crypto.createHmac('sha256', secret).update(secret).digest('hex');
                        const UsrIDVal = crypto.randomBytes(32).toString('hex');

                        let obj = 
                        {
                            "UsrEmailAddress": getData.UsrEmailAddress,
                            "UsrFullName": getData.UsrFullName,
                            "UsrPassword": pwdkeyVal,
                            "UsrImage": process.env.URL+getData.UsrImage,
                            "UsrType": getData.UsrType,
                            "UsrStatus": getData.UsrStatus,
                            "UsrID": UsrIDVal,
                            "UsrCity" : getData.UsrCity,
                            "rolePermission": ObjectId(docRole._id)
                        }

                        Models.GaPrtUsersSchema.create(obj).then(resp => {

                            if (err) 
                            res.send({statusCode : 400,data: resp,message: 'Invalid Data'}) 
                            else
                            res.send({statusCode : 200,data: resp, message: 'data Sucessfully Updated'})

                        });

                } catch (e)
                {
                    next(e);
                }
        }

    });
  }

exports.IsValidUser= async (req, res, next) => {

        let emailaddressVal = req.body.UsrEmailAddress;
        let passwordVal = req.body.UsrPassword;
        const secret = emailaddressVal + passwordVal;
        let pwdkeyVal = crypto.createHmac('sha256', secret).update(secret).digest('hex');
        var query = { "UsrEmailAddress": emailaddressVal,"UsrPassword": pwdkeyVal  };
        await Models.GaPrtUsersSchema.findOne(query).exec((err, docs) => {

            if  (docs==null)
            return res.json({ message: "Invalid Userid and password", statusCode: 400 });
            
            let token =   generateToken(emailaddressVal);
            let userData = {
                "_id": docs._id,
                "UsrEmailAddress": docs.UsrEmailAddress,
                "UsrFullName": docs.UsrFullName,
                "usertype": docs.UsrType,
                "UsrStatus": docs.UsrStatus,
                "UsrImage": process.env.URL+docs.UsrImage,
                "UsrID": docs.UsrID,
                "rolePermission": docs.rolePermission,
                "access_token": token
            }
          return res.json({ message: "success", statusCode: 200, count : docs.length,   data:  userData  });
              
                
         
     });
}

exports.IsAdminRole= async (req, res, next) => {

    console.log(process.env.URL);
    var query = { "adminCode" : "1"  };
    await Models.GaRolesSchema.findOne(query).exec((err, docs) => {
    return res.json({ message: "success", statusCode: 200  });
    
    });
}