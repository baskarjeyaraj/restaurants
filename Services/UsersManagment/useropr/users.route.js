const express = require("express");
const router = express.Router();
const UsersService = require('./users');
const { verifyRequest } = require('../../../helpers/tokenManagment')
const { VerifyDuplicateUser} = require('../../../helpers/verifyManagment');

//Post API
router.post('/addAccount',verifyRequest,VerifyDuplicateUser,UsersService.addAccount);
router.post('/authLogin',UsersService.IsValidUser);
router.post('/IsAdminRole',UsersService.IsAdminRole);
module.exports = router;