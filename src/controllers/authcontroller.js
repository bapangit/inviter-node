var jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { generateTokens } = require("../utils/tokenutils");
const { resSuccessJson } = require("../utils/responseutils");

exports.googleLogin = async (req, res) => {
  try {
    const { email, name } = {
      email: "cmandal97531@gmail.com",
      name: "Chandan Mandal",
    };

    const tokens = generateTokens(email);
    const user = await User.findOne({ email });

    if (user) {
      await User.findByIdAndUpdate(user._id, {
        email,
        name,
        ...tokens,
      });
    } else {
      await new User({
        email,
        name,
        ...tokens,
      }).save();
    }

    resSuccessJson(res, { name, email, ...tokens });
  } catch (err) {
    console.log("err", err.message);
    res.status(500).json({ error: err.message });
  }
};

// exports.logout = async (req, res) => {
//   try {
//     const accessToken = req.headers.authorization.split(" ")[1];
//     await User.findOneAndUpdate(
//       { accessToken },
//       { accessToken: null, refreshTokens: null }
//     );
//     resSuccessJson(res, {});
//   } catch (e) {
//     console.log(e);
//   }
// };

// exports.refreshAccessTokens = async (req, res) => {
//   try {
//     const { refreshToken } = req.body;
//     if (!refreshToken) throw new Error("invalidRefreshToken");
//     const { email } = jwt.verify(refreshToken, process.env.SECRET_KEY);
//     const user = await User.findOne({ email: email });

//     if (user) {
//       const newTokens = generateTokens(email);
//       User.findByIdAndUpdate(user._id, newTokens, (err, docs) => {
//         if (err) {
//           return resServerError(res);
//         } else {
//           resSuccessJson(res, newTokens);
//         }
//       });
//     } else {
//       return resServerError(res);
//     }
//   } catch (err) {
//     return resAuthError(res);
//   }
// };
