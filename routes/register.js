var express = require("express");
var router = express.Router();

/* Registering new user. */
router.get("/", function (req, res, next)
{
    res.send("Register");
});

module.exports = router;
