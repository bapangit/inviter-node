var jwt = require("jsonwebtoken");
const { authConfig } = require("../config");
exports.generateTokens = (email) => {
  const accessToken = jwt.sign({ email }, process.env.SECRET_KEY, {
    expiresIn: authConfig.accessTokenExpiresIn,
  });
  const refreshToken = jwt.sign({ email }, process.env.SECRET_KEY, {
    expiresIn: authConfig.refreshTokenExpiresIn,
  });
  return { accessToken, refreshToken };
};

exports.verifyToken = (token) => {
  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      return err;
    } else {
      return payload;
    }
  });
};

exports.extractBearerToken = (token) => {
  const tokenStartIndex = 7;
  if (token && token.startsWith("Bearer ")) {
    return token.substring(tokenStartIndex);
  } else {
    return new Error("Empty bearer token !");
  }
};
