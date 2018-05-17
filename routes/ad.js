var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
var multer = require('multer');

var Ad = require('../models/ad');
var Category = require('../models/category');
var User = require('../models/user');

const TOKEN = 'secret_token';
const AD_GEO_RANGE = 0.1264;

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/adsImages/');
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

router.delete('/:adId', function (req, res, next) {
    jwt.verify(req.query.token, TOKEN, function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
    });

    var decoded = jwt.decode(req.query.token);
    Ad.findOneAndRemove({ _id: req.params.adId, userId: decoded.user._id })
        .then(() => {
            return res.status(200).json({
                response: 'Ad removed successfully'
            });
        })
        .catch((error) => {
            return res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        });
});

function getImagesPath(imagesArray) {
    let imagesPath = [];
    for (const image of imagesArray) {

        imagesPath.push(image.path);
    }

    return imagesPath;
}

router.post('/adauga-anunt', upload.array('adImages', 5), function (req, res, next) {
    jwt.verify(req.query.token, TOKEN, function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
    });

    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id)
        .then((user) => {
            if (!user) {
                return res.status(500).json({
                    title: 'Error',
                    error: 'No user found by id'
                });
            }

            Category.findOne({ name: req.body.categoryName })
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
                        location: req.body.location,
                        expirationDate: req.body.expirationDate,
                        images: getImagesPath(req.files)
                    });

                    ad.save()
                        .then((ad) => {
                            User.find({
                                notificationEnabled: true,
                                notificationCategories: category._id
                            })
                                .select('-_id email location notificationRange')
                                .then((users) => {
                                    let emailInRange = [];

                                    for (const user of users) {
                                        let distanceBetween = calculateDistanceFrom(ad.location, user.location);
                                        if (distanceBetween <= user.notificationRange) {
                                            emailInRange.push(user.email);
                                        }
                                    }

                                    sendMailMotificationToUsers(emailInRange, ad._id, req.body.title, category.name, req.body.expirationDate);
                                });

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

router.patch('/adauga-anunt', function (req, res, next) {
    jwt.verify(req.query.token, TOKEN, function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
    });

    var decoded = jwt.decode(req.query.token);
    Category.find({ name: req.body.ad.categoryName })
        .select('_id')
        .lean()
        .then((category) => {
            if (!category) {
                return res.status(500).json({
                    title: 'Invalid category',
                    error: error
                });
            }

            Ad.findOneAndUpdate({ _id: req.body.adId, userId: decoded.user._id }, {
                $set: {
                    categoryId: category[0]._id,
                    title: req.body.ad.title,
                    description: req.body.ad.description,
                    location: req.body.ad.location,
                    expirationDate: req.body.ad.expirationDate
                }
            })
                .then(() => {
                    return res.status(200).json({
                        title: 'Anuntul a fost modificat'
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

router.get('/adauga-anunt/:adId', function (req, res, next) {
    jwt.verify(req.query.token, TOKEN, function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
    });

    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id)
        .then((user) => {
            Ad.findById(req.params.adId)
                .populate('userId', '-_id')
                .populate('categoryId', '-_id name')
                .then((ad) => {
                    return res.status(200).json({
                        result: ad
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

router.get('/location/coords', function (req, res, next) {
    let lat = req.query.lat;
    let lng = req.query.lng;

    if (lat && lng) {
        Ad.find({
            expirationDate: { $gt: Date.now() }, selectedOffertId: { $eq: null },
            // 'location.lat': { $gt: lat - AD_GEO_RANGE, $lt: lat + AD_GEO_RANGE },
            // 'location.lng': { $gt: lng - AD_GEO_RANGE, $lt: lng + AD_GEO_RANGE }
        })
            .select('_id title description categoryId location')
            .populate('categoryId', '-_id name')
            .lean()
            .then((ads) => {
                let result = [];

                for (const ad of ads) {
                    let tempAd = {
                        id: ad._id,
                        categoryName: ad.categoryId.name,
                        title: ad.title,
                        description: ad.description,
                        location: ad.location
                    }
                    result.push(tempAd);
                }

                return res.status(200).json({
                    title: 'Ads by range',
                    result: result
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: error
                });
            });
    } else {
        res.status(500).json({
            title: 'Error',
            error: 'No location coords given.'
        });
    }
});

router.get('/:category/:adId', function (req, res, next) {
    Ad.findById({ _id: req.params.adId })
        .select('_id title description expirationDate location selectedOffertId')
        .lean()
        .then((ad) => {
            let expirationDate = new Date(ad.expirationDate);
            if (expirationDate < Date.now() || ad.selectedOffertId != undefined) {
                ad.isActive = false;
            }

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
    const category = req.params.category;
    Category.findOne({ name: category })
        .select('_id')
        .then((categoryId) => {
            Ad.find({ categoryId: categoryId._id, expirationDate: { $gt: Date.now() }, selectedOffertId: { $eq: null } })
                //TODO: Handle image
                .select('_id title description expirationDate location')
                .then((ads) => {
                    return res.status(200).json({
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
    let limit = req.query.limit ? req.query.limit : 0;
    limit = Number(limit);
    Ad.find({ expirationDate: { $gt: Date.now() }, selectedOffertId: { $eq: null } })
        //TODO: Handle image
        .select('_id title description expirationDate location categoryId')
        .populate('categoryId', 'name')
        .sort('-_id')
        .limit(limit)
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

//TODO: Create controller for this
function sendMailMotificationToUsers(emails, adId, adTitle, categoryName, expirationDate) {
    let toEmails = "";
    for (var i = 0; i < emails.length; i++) {
        toEmails += emails[i];
        if (i < emails.length - 1) {
            toEmails += ", ";
        }
    }

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sibiu.servicii.ro@gmail.com',
            pass: 'servicii.ro'
        }
    });

    transporter.use('compile', hbs({
        viewPath: 'public/mail-templates',
        extName: '.hbs'
    }));

    var mailOptions = {
        from: 'sibiu.servicii.ro@gmail.com',
        // to: toEmails,
        to: toEmails + ', catacrisan_catacrsn@yahoo.com',
        subject: 'Au aparut noi cereri in zona ta',
        template: 'new-ad.template',
        context: {
            adId: adId,
            adTitle: adTitle,
            categoryName: categoryName,
            expirationDate: new Date(expirationDate).toLocaleString()
        }
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function toRadians(angle) { return angle * (Math.PI / 180); }

function calculateDistanceFrom(location, userLocation) {
    let lat1 = Number(location.lat);
    let lat2 = Number(userLocation.lat);
    let lng1 = Number(location.lng);
    let lng2 = Number(userLocation.lng);

    var R = 6371e3; // metres
    var φ1 = toRadians(lat1);
    var φ2 = toRadians(lat2);
    var Δφ = toRadians(lat1 - lat2);
    var Δλ = toRadians(lng1 - lng2);

    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    var d = R * c;
    return d / 1000.0;
}


module.exports = router;