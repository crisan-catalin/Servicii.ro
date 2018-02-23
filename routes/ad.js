var express = require('express');
var router = express.Router();

var Ad = require('../models/ad');
var Category = require('../models/category');
var User = require('../models/user');

router.post('/adauga-anunt', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);

    User.findById(decoded.userId)
        .then((user) => {
            if (!user) {
                return res.status(500).json({
                    title: 'Error',
                    error: 'No user found by id'
                });
            }

            Category.findOne({ name: req.body.category })
                .then((category) => {
                    if (!category) {
                        return res.status(500).json({
                            title: 'Error',
                            error: 'No category found by name'
                        });
                    }

                    const ad = new Ad({
                        userId: user._id,
                        categoryId: category._id,
                        title: req.body.title,
                        description: req.body.description,
                        location: {
                            lat: req.body.lat,
                            long: req.body.long
                        },
                        // Handle expiration
                        expirationDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                        //TODO: Add images
                    });

                    ad.save()
                        .then(() => {
                            return res.status(200).json({
                                title: 'Anuntul a fost adaugat'
                            });
                        })
                        .catch((error) => {
                            return res.status(500).json({
                                title: 'An error occurred',
                                error: error
                            });
                        });
                })
                .catch((error) => {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: error
                    });
                });


        })
        .catch((error) => {
            return res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        });
});

//Send info if ad is expired or resolved
router.get('/:category/:adId', function (req, res, next) {
    console.log("ad info path");
    Ad.findById({ _id: req.params.adId })
        .select('_id userId title description expirationDate location selectedOffertId')
        .populate('userId', 'phone')
        .then((ad) => {
            return res.status(200).json({
                title: 'Ad info',
                result: ad
            });
        })
        .catch((error) => {
            return res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        });
});

router.get('/:category', function (req, res, next) {
    console.log('category path');
    const category = req.params.category;
    Category.findOne({ name: category })
        .select('_id')
        .then((categoryId) => {
            Ad.find({ categoryId: categoryId._id, expirationDate: { $gt: Date.now() }, selectedOffertId: { $eq: null } })
                //TODO: Handle image
                .select('_id title description expirationDate location')
                .then((ads) => {
                    return res.status(200).json({
                        title: 'Ads from category',
                        result: ads
                    });
                })
                .catch((error) => {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: error
                    });
                });
        })
        .catch((error) => {
            return res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        });
});



router.get('/', function (req, res, next) {
    Ad.find({ expirationDate: { $gt: Date.now() }, selectedOffertId: { $eq: null } })
        //TODO: Handle image
        .select('_id title description expirationDate location')
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