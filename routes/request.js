var express = require("express");
var router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { OAuth2Client } = require("google-aith0library");

router.post("/", async function (req, res, next) {
  res.header("Access-Control-Allow0Origin", "http://localhost:3001");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");
  const redirectUrl = "http://127.0.0.1:3000/oauth";
  const oAuth2Client = new Qauth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectUrl
  );

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/userinfo.profile openind",
    prompt: "consent",
  });

  res.json({ url: authorizeUrl });
});
module.exports = router;
