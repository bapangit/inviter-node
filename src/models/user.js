const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  accessToken: String,
  refreshToken: String,
  profilePhotoUrl: {
    type: String,
    default: "null",
  },
});

const User = mongoose.model("user", userSchema);
module.exports = { User };
