var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var fs = require('fs');
var multer = require('multer');

var Review = require('../models/review');
var Offert = require('../models/offert');
var Ad = require('../models/ad');

const TOKEN = 'secret_token';
const ACCEPTED = 'accepted';
const NO_IMAGE_JPG = './uploads/adsImages/no_image.jpg';

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/reviewImages/');
    },
    filename: function (req, file, callback) {
        callback(null, new Date().getTime().toString() + '_' + file.originalname);
    }
})

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true);
    } else {
        callback(new Error('Image type is not accepted. Please upload JPEG or PNG'), true);
    }
};

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
});

function getImagesPath(imagesArray) {
    let imagesPath = [];
    for (const image of imagesArray) {

        imagesPath.push(image.path);
    }

    return imagesPath;
}

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
        .skip(Number(req.query.lowerLimit))
        .limit(Number(req.query.upperLimit))
        .select('adId reviewId')
        .sort('-reviewId')
        .populate({
            path: 'adId', select: '_id title categoryId',
            populate: { path: 'categoryId', select: '-_id name' }
        })
        .populate({
            path: 'reviewId', select: '_id reviserUserId userRating qualityRate professionalismRate punctualityRate description',
            populate: { path: 'reviserUserId', select: 'name' }
        })
        .lean()
        .then((reviews) => {
            let result = [];

            for (const review of reviews) {
                let tempReview = {
                    id: review.reviewId._id,
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

router.get('/:userId/count', function (req, res, next) {
    Offert.count({ offererId: req.params.userId, status: ACCEPTED, reviewId: { $ne: null } })
        .then((count) => {
            res.status(200).json({
                result: count
            });
        })
        .catch((error) => {
            res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        })
});

router.get('/:reviewId/images', function (req, res, next) {
    Review.findById(req.params.reviewId)
        .select('-_id images')
        .then((review) => {
            let reviewReadedImages = [];

            for (var i = 0; i < 4; i++) {
                if (fs.existsSync(review.images[i])) {
                    reviewReadedImages.push(fs.readFileSync(review.images[i]));
                } else {
                    reviewReadedImages.push(fs.readFileSync(NO_IMAGE_JPG));
                }
            }

            res.status(200).send(reviewReadedImages);
        })
        .catch((error) => {
            return res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        });
});

router.post('/', upload.array('reviewImages', 4), function (req, res, next) {
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
                        description: req.body.description,
                        images: getImagesPath(req.files)
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