const { verifyRequest } = require('../../../helpers/tokenManagment')
module.exports = (app) => {
    app.use('/resopr' , require('./resopr.route')) /// validation reqestr vaerifyer function
}