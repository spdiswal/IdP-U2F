var express = require("express");
var router = express.Router();

/* Managing YubiKey devices. */
router.get("/", function (req, res, next)
{
    res.send("Manage");
});

module.exports = router;
