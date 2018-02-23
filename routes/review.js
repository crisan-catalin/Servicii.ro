var express = require('express');
var router = express.Router();

var Review = require('../models/review');
var Offert = require('../models/offert');

const ACCEPTED = 'accepted';

router.get('/:userId', function (req, res, next) {
    Offert.find({ offererId: req.params.userId, status: ACCEPTED })
        .select('adId reviewId')
        .populate('adId','_id title')
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
                error: err
            });
        })
});

module.exports = router;