const PORT = process.env.PORT || 7001;
const express = require('express');
const { connect } = require('mongoose');
const app = express()
const passport = require("passport");
var bodyParser = require('body-parser');
const path = require("path")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
const dataBaseUrl = require('./config/config')
const dbConnBaseUrl = require('./dbconn/dbconn')
const scheduledFunctions = require('./scheduledFunctions/sendMessage');

var cors=require('cors');
app.use(cors());

//Swagger
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

//Assets & Storage
app.use('/storage' , express.static('storage'));
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));

//Routing
require("dotenv").config();
require("./Services/index")(app); 
//require("./Restaurant/restopr/index")(app); 
//require("./UsersManagment/useropr/index")(app); 
//  scheduledFunctions
scheduledFunctions.initScheduledJobs();

console.log("server started right now " + PORT )
app.listen(PORT)