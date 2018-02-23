var express = require('express');
var router = express.Router();

var Location = require('../models/location')

router.get('/', function (req, res, next) {
    res.render('index');
});

module.exports = router;
