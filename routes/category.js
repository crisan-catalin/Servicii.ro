var express = require('express');
var router = express.Router();

var Category = require('../models/category');

router.get('/', function (req, res, next) {
    Category.find({})
        .select('_id name')
        .then((categories) => {
            return res.status(200).json({
                result: categories
            });
        })
        .catch((error) => {
            return res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        });
});

module.exports = router;