var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Review = require('../models/review');
var Offert = require('../models/offert');

const TOKEN = 'secret_token';
const ACCEPTED = 'accepted';

router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, TOKEN, function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});

router.get('/:userId', function (req, res, next) {
    Offert.find({ offererId: req.params.userId, status: ACCEPTED })
        .select('adId reviewId')
        .populate('adId', '_id title')
        .populate('reviewId', 'reviserUserId userRating description')
        .populate('reviewId.reviserUserId', 'name')
        .exec()
        .then((result) => {
            res.status(200).json({
                result: result
            });
        })
        .catch((error) => {
            res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        })
});

module.exports = router;