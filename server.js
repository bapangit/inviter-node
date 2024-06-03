require("dotenv").config();
var express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const port = process.env.PORT || 8080;

var app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("", function (req, res) {
  res.send("Welcome !");
});

//routes
app.use("/", require("./src/router"));

//DB Connect
mongoose.connect(process.env.ATLAS_DB_URL).then(
  (res) => {
    console.log("DATABASE CONNECTED SUCCESSFULLY");
    //server
    var server = app.listen(port, function () {
      var host = server.address().address;
      var port = server.address().port;

      console.log("Example app listening at http://%s:%s", host, port);
    });
  },
  (err) => {
    console.log(err);
  }
);
