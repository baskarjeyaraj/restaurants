const fs = require('fs');
var multer  = require('multer');
var path  = require('path');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      var destinationDirectory = path.join(__dirname, `../storage`);
      fs.access(destinationDirectory, async function (error) {
        if (error) {
          console.log("Directory does not exist.")
          cb('Directory does not exist.')
        } else {
            var destFolder = `./storage`
            cb(null, destFolder)
        }
      })
    },
    filename: (req, file, cb) => {      
      cb(null, file.originalname)
    }
  });
      
  //will be using this for uplading
  const upload = multer({ storage: storage }).fields([
    { name: 'file' },
    { name: 'UsrID' },
  ]);
  module.exports = {
    upload
};
