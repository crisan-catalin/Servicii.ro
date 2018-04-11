var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Review = require('../models/review');
var Offert = require('../models/offert');
var Ad = require('../models/ad');

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

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);

    Ad.count({ _id: req.body.adId, userId: decoded.user._id })
        .then(count => {
            if (count == 0) {
                return res.status(200).json({
                    title: 'Error',
                    error: 'Invalid ad owner.'
                });
            }

            Review.count({ adId: req.body.adId })
                .then(count => {
                    if (count > 0) {
                        return res.status(200).json({
                            title: 'Error',
                            error: 'Review already exist for this ad.'
                        });
                    }

                    const review = new Review({
                        adId: req.body.adId,
                        reviserUserId: decoded.user._id,
                        userRating: req.body.rating,
                        title: req.body.title,
                        description: req.body.description
                    });

                    review.save()
                        .then((result) => {
                            console.log("Saved review:")
                            console.log(result);
                            Offert.findOneAndUpdate({ adId: req.body.adId, status: ACCEPTED }, {
                                $set: {
                                    reviewId: result._id
                                }
                            })
                                .then(() => {
                                    return res.status(200).json({
                                        title: 'Review saved successfully'
                                    });
                                })
                                .catch((error) => {
                                    return res.status(400).json({
                                        title: 'Error',
                                        error: error
                                    });
                                })
                        })
                        .catch((error) => {
                            return res.status(400).json({
                                title: 'Error',
                                error: error
                            });
                        })
                })
                .catch((error) => {
                    res.status(500).json({
                        title: 'An error occurred',
                        error: error
                    });
                })
        })
        .catch((error) => {
            res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        })
});

module.exports = router;