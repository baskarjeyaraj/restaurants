const mongoose = require('mongoose');
const dataBaseUrl = require('../config/config')
const connect = mongoose.connect(dataBaseUrl.url, {
useNewUrlParser: true,
useUnifiedTopology: true,
useFindAndModify: false,
useCreateIndex: true
}).then(() => {
console.log("Successfully connected to the database");
}).catch(err => {
console.log('Could not connect to the database. Exiting now...', err);
process.exit();
});
module.exports = {
connect
}
