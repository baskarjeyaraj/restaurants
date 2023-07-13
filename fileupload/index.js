const { verifyRequest } = require('../helpers/tokenManagment')
module.exports = (app) => {
    app.use('/fileupload' , require('./fileupload.route')) /// validation reqestr vaerifyer function
}