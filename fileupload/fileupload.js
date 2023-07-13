
const { upload } = require('../helpers/upload');
exports.uploadAny = async (req, res, next) => {
  try {
    await upload(req, res, function (err ,file) {
      if (err) {
        return res.end("Error uploading file. + err" + err);
      } else {
        res.send(req.files);
      }

    });
  } catch (e) {
    console.log(e)
    next(e);
  
  }
}
 