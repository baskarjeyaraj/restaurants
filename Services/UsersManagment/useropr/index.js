const { verifyRequest } = require('../../../helpers/tokenManagment')
module.exports = (app) => {
    app.use('/users' , require('./users.route')) /// validation reqestr vaerifyer function
}