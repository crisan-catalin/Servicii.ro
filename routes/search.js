var express = require('express');
var router = express.Router();

var Ad = require('../models/ad');

router.get('/', function (req, res, next) {
    console.log("Query: " + req.query.q)
    Ad.find({
        expirationDate: { $gt: Date.now() }, selectedOffertId: { $eq: null },
        $or: [{ title: { $regex: req.query.q } }, { description: { $regex: req.query.q } }]
    })
        //TODO: Handle image
        .select('_id title description expirationDate location categoryId')
        .populate('categoryId', 'name')
        .then((ads) => {
            return res.status(200).json({
                title: 'All ads',
                result: ads
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
