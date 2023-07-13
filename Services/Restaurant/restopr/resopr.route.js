const express = require("express");
const router = express.Router();
const ResService = require('./resopr');
const { verifyRequest } = require('../../../helpers/tokenManagment')
const { verifyIsAdminUser} = require('../../../helpers/verifyManagment');
router.post('/getResturant',ResService.getResturant);
router.post('/addResturant',verifyRequest,verifyIsAdminUser,ResService.addResturant);
router.post('/updResturant',verifyRequest,verifyIsAdminUser,ResService.updResturant);
router.post('/delResturant',verifyRequest,verifyIsAdminUser,ResService.delResturant);
router.post('/searchResturant',ResService.searchResturant);
router.post('/nearResturant',ResService.nearResturant);
module.exports = router;