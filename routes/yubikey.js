var express = require("express");
var router = express.Router();
var session = require('express-session');

router.get("/", function (req, res, next)
{
    res.render("yubikey", {});
});

module.exports = router;