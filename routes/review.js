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
    Offert.find({ offererId: req.params.userId, status: ACCEPTED, reviewId: { $ne: null } })
        .select('adId reviewId')
        .sort('-reviewId')
        .populate({
            path: 'adId', select: '_id title categoryId',
            populate: { path: 'categoryId', select: '-_id name' }
        })
        .populate({
            path: 'reviewId', select: '-_id reviserUserId userRating qualityRate professionalismRate punctualityRate description',
            populate: { path: 'reviserUserId', select: 'name' }
        })
        .lean()
        .then((reviews) => {
            let result = [];

            for (const review of reviews) {
                let tempReview = {
                    adId: review.adId._id,
                    adTitle: review.adId.title,
                    categoryName: review.adId.categoryId.name,
                    reviserUserId: review.reviewId.reviserUserId._id,
                    reviserName: review.reviewId.reviserUserId.name,
                    rating: review.reviewId.userRating,
                    qualityRate: review.reviewId.qualityRate,
                    professionalismRate: review.reviewId.professionalismRate,
                    punctualityRate: review.reviewId.punctualityRate,
                    description: review.reviewId.description
                }
                result.push(tempReview);
            }

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

    Ad.findOne({ _id: req.body.adId, userId: decoded.user._id })
        .then(ad => {
            if (!ad) {
                return res.status(200).json({
                    title: 'Error',
                    error: 'Invalid ad.'
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
                        qualityRate: req.body.qualityRate,
                        professionalismRate: req.body.professionalismRate,
                        punctualityRate: req.body.punctualityRate,
                        title: req.body.title,
                        description: req.body.description
                    });

                    review.save()
                        .then((result) => {
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