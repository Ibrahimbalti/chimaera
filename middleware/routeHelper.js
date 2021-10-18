const multer = require("multer");
const uuid = require('uuid/v4');//added
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')
const { OAuth2Client } = require("google-auth-library");
const appConfig = require('../config/config')
const client = new OAuth2Client();

aws.config.update({
  secretAccessKey: 'aipGCheM2QPLXoA32LFzstMM2HG3BRpI67hEhdNv',
  accessKeyId:'AKIAJRCEXHR25RI26S6A',
  region: 'us-west-1'
})

const s3 = new aws.S3({ })

module.exports.googleTokenVerify = async (req, res, next) => {
  const ticket = await client.verifyIdToken({
    idToken: req.body.id_token,
    audience: appConfig.googleClientId
  });
  const payload = ticket.getPayload();
  if (payload) {
    req.user = payload;
    next();
  } else {
    if (payload.exp < Date.now()) {
      res.status(500).json({
        err: "Token expired. Try login again"
      });
    } else {
      res.status(500).json({
        err: "Cannot authenticated using google"
      });
    }
  }
};

// Configaration for multer
module.exports.uploadImage = multer({
  fileFilter(req, file, cb) {
    if (
      file.originalname.endsWith(".jpg") ||
      file.originalname.endsWith(".JPG") ||
      file.originalname.endsWith(".png") ||
      file.originalname.endsWith(".PNG") ||
      file.originalname.endsWith(".jpeg") ||
      file.originalname.endsWith(".JPEG")
    ) {
      return cb(undefined, true);
    }
    cb(new Error("Please upload a valid image."));
  },
  storage: multerS3({
    s3: s3,
    bucket: 'chimaera-images',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

//Handle route err
module.exports.handleError = (e, req, res, next) => {
  res.status(400).json({ err: e.message });
};
