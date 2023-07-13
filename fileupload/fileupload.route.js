const { verifyRequest } = require('../helpers/tokenManagment')
const express = require("express");
const router = express.Router();
const fnFileupload = require('./fileupload');
router.post('/uploadAny', fnFileupload.uploadAny);
module.exports = router;