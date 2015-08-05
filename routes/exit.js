var express = require("express");
var router = express.Router();
var session = require('express-session');

router.get("/", function (req, res, next)
{
    delete req.session.username;
    res.redirect('/');
});

module.exports = router;