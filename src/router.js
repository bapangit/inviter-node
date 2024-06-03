const express = require("express");
const { googleLogin } = require("./controllers/authcontroller");
const router = express.Router();

router.post("/googlelogin", googleLogin);
// router.post("/logout", logout);
// router.post("/refresh", refreshAccessTokens);
module.exports = router;
