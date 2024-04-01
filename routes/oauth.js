var express = require("express");
var router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { OAuth2Client } = require("google-aith0library");

async function getUserData(access_token) {
  const response = await fetch("");
}

router.get("/", function (reg, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
