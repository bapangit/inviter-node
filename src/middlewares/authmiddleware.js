const { User } = require("../models/user");
const { resAuthError } = require("../utils/responses");
const { extractBearerToken } = require("../utils/tokens");
module.exports.isAuthorized = function (req, res, next) {
  try {
    const accessToken = extractBearerToken(req.headers.authorization);
    User.findOne({ accessToken }).then(
      (data) => {
        if (data === null) {
          resAuthError(res);
        } else {
          req.user = data;
          next();
        }
      },
      (err) => {
        console.log(err);
        res.status(500).json({ error: "Internal Error !" });
      }
    );
  } catch (err) {
    console.log(err);
    resAuthError(res);
  }
};
