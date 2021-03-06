var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var multer = require('multer');
var path = require('path');
var fs = require('fs');

var User = require('../models/user');
var Ad = require('../models/ad');
var Offert = require('../models/offert');
var Category = require('../models/category');
var Certificate = require('../models/certificate');

const TOKEN = 'secret_token';

const ACCEPTED = 'accepted';
const HOLDING = 'holding';

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/certificates/');
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

router.get('/anunturi', function (req, res, next) {
    var decodedToken = jwt.decode(req.query.token);
    Ad.find({ userId: decodedToken.user._id, expirationDate: { $gt: Date.now() }, selectedOffertId: { $eq: null } })
        .select('_id title expirationDate categoryId')
        .populate('categoryId', "-_id name")
        .then((ads) => {
            res.status(200).json({
                result: ads
            });
        })
        .catch((error) => {
            return res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        })
});

// Ofertele mele catre utilizatori
router.get('/oferte', function (req, res, next) {
    var decodedToken = jwt.decode(req.query.token);
    Offert.find({ offererId: decodedToken.user._id })
        .lean()
        .then((offerts) => {
            var result = {};
            result['accepted'] = [];
            result['holding'] = [];

            for (const offert of offerts) {
                if (offert.hasOwnProperty('status')) {
                    if (offert['status'] == ACCEPTED) {
                        result[ACCEPTED].push(offert);
                    } else if (offert['status'] == HOLDING) {
                        result[HOLDING].push(offert);
                    }
                }
            }

            res.status(200).json({
                result: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        });
});

router.get('/setari/user-info', function (req, res, next) {
    var decodedToken = jwt.decode(req.query.token);
    User.findById(decodedToken.user._id)
        .select('name phone location biography experienceYears notificationEnabled notificationRange notificationCategories')
        .then((user) => {
            if (!user) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: 'User not found'
                });
            }
            return res.status(200).json({
                result: user
            });
        })
        .catch((error) => {
            return res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        });
});

router.get('/setari/user-info/categories', function (req, res, next) {
    var decodedToken = jwt.decode(req.query.token);

    User.findById(decodedToken.user._id)
        .select('-_id notificationCategories')
        .populate('notificationCategories', 'name')
        .lean()
        .then((user) => {
            res.status(200).json({
                result: user.notificationCategories
            });
        })
        .catch((error) => {
            res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        });
});

router.patch('/setari/user-info/categories', function (req, res, next) {
    var decodedToken = jwt.decode(req.query.token);

    Category.findById(req.body.categoryId)
        .select('_id')
        .then((category) => {
            if (category) {
                User.findById(decodedToken.user._id)
                    .select('-_id notificationCategories')
                    .lean()
                    .then((user) => {
                        if (Boolean(req.body.isSelected) == true) {
                            let index = -1;
                            for (var i = 0; i < user.notificationCategories.length; i++) {
                                if (String(user.notificationCategories[i]) == String(category._id)) {
                                    index = i;
                                }
                            }
                            if (index == -1) {
                                user.notificationCategories.push(category._id);
                            }
                        } else {
                            for (var i = 0; i < user.notificationCategories.length; i++) {
                                if (String(user.notificationCategories[i]) == String(category._id)) {
                                    user.notificationCategories.splice(i, 1);
                                }
                            }
                        }

                        User.findByIdAndUpdate(decodedToken.user._id, { $set: { notificationCategories: user.notificationCategories } })
                            .then(() => {
                                res.status(200).json({
                                    result: "Notification categories updated!"
                                });
                            })
                            .catch((error) => {
                                res.status(500).json({
                                    title: 'An error occurred',
                                    error: error
                                });
                            });
                    })
                    .catch((error) => {
                        res.status(500).json({
                            title: 'An error occurred',
                            error: error
                        });
                    });;
            }
        })
        .catch((error) => {
            res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        });;
});

router.patch('/setari/user-info/notification', function (req, res, next) {
    var decodedToken = jwt.decode(req.query.token);

    User.findByIdAndUpdate(decodedToken.user._id, { $set: { notificationEnabled: req.body.isEnabled } })
        .then(() => {
            res.status(200).json({
                result: 'Notification updated successfully'
            });
        })
        .catch((error) => {
            res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        });
});

router.patch('/setari/user-info', function (req, res, next) {
    var $set = {};

    if (req.body.name) {
        $set.name = req.body.name;
    }
    if (req.body.phone) {
        $set.phone = req.body.phone;
    }
    if (req.body.experienceYears) {
        $set.experienceYears = req.body.experienceYears;
    }
    if (req.body.biography) {
        $set.biography = req.body.biography;
    }
    if (req.body.notificationRange) {
        $set.notificationRange = req.body.notificationRange;
    }

    // // Ex: {"lat": 21.2453, "lng": -21.333}
    if (req.body.location) {
        const location = req.body.location;
        if (location.lat && location.lng) {
            $set.location = {};
            $set.location.lat = location.lat;
            $set.location.lng = location.lng;
        }
    }

    var decodedToken = jwt.decode(req.query.token);
    User.findByIdAndUpdate(decodedToken.user._id, {
        $set
    }, function (err) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        }
        res.status(200).json({
            title: 'User info updated successfully'
        });
    });
});

router.patch('/setari/password', function (req, res, next) {
    var decodedToken = jwt.decode(req.query.token);
    User.findByIdAndUpdate(decodedToken.user._id, {
        $set: { password: bcrypt.hashSync(req.body.password, 10) }
    }, function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            title: 'Password changed successfully'
        });
    });
});

router.patch('/setari/email', function (req, res, next) {
    var decodedToken = jwt.decode(req.query.token);

    User.findById(decodedToken.user._id)
        .then((user) => {
            if (!user) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: userIdError
                });
            }

            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(401).json({
                    title: 'Invalid password',
                    error: { message: 'Invalid credentials' }
                });
            }

            const userNewEmail = req.body.email;
            User.findOne({ email: userNewEmail })
                .then((userWithEmail) => {
                    if (userWithEmail) {
                        return res.status(500).json({
                            error: 'Eroare',
                            title: 'Email already exist'
                        });
                    }

                    User.findByIdAndUpdate(user._id, { $set: { email: userNewEmail } }, function (err) {
                        if (err) {
                            return res.status(500).json({
                                title: 'An error occurred',
                                error: err
                            });
                        }

                        return res.status(200).json({
                            title: 'Email changed successfully'
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

router.delete('/setari/delete', function (req, res, next) {
    var decodedToken = jwt.decode(req.query.token);
    User.findByIdAndRemove(decodedToken.user._id)
        .then(() => {
            return res.status(200).json({
                title: 'Account deleted successfully'
            });
        })
        .catch((error) => {
            return res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        });
});

router.get('/setari/user-info/certificate', function (req, res, next) {
    var decodedToken = jwt.decode(req.query.token);

    Certificate.find({ userId: decodedToken.user._id })
        .select('title')
        .then((certificates) => {
            res.status(200).json({
                result: certificates
            });
        })
        .catch((error) => {
            res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        });
});

router.post('/setari/user-info/certificate', upload.single('certificateImage'), function (req, res, next) {
    var decodedToken = jwt.decode(req.query.token);

    let newCertificate = new Certificate({
        userId: decodedToken.user._id,
        categoryId: req.body.category,
        title: req.body.title,
        filePath: req.file.path
    });

    newCertificate.save()
        .then((certificate) => {
            let result = { _id: certificate._id, title: certificate.title };

            res.status(200).json({
                title: 'Certificate uploaded successfully',
                result: result
            });
        })
        .catch((error) => {
            res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        });
});

router.delete('/setari/user-info/certificate', function (req, res, next) {
    var decodedToken = jwt.decode(req.query.token);
    let certificateId = req.query.id;

    Certificate.findOneAndRemove({ _id: certificateId, userId: decodedToken.user._id })
        .then((certificate) => {
            if (fs.existsSync(certificate.filePath)) {
                fs.unlinkSync(certificate.filePath);
            }

            res.status(200).json({
                title: 'Certificate removed successfully'
            });
        })
        .catch((error) => {
            res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        });
});

module.exports = router;