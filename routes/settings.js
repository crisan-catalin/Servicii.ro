var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Ad = require('../models/ad');
var Offert = require('../models/offert');

const TOKEN = 'secret_token';

const ACCEPTED = 'accepted';
const HOLDING = 'holding';

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
                error: err
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

    // Ex: {"lat": 21.2453, "lng": -21.333}
    if (req.body.location) {
        const location = JSON.parse(req.body.location);
        if (location.lat && location.lng) {
            $set.location = {};
            $set.location.lat = location.lat;
            $set.location.lng = location.lng;
        }
    }
    if (req.body.experienceYears) {
        $set.experienceYears = req.body.experienceYears;
    }
    if (req.body.biography) {
        $set.biography = req.body.biography;
    }

    var decodedToken = jwt.decode(req.query.token);
    User.findByIdAndUpdate(decodedToken.user._id, {
        $set
    }, function (err) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
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

router.patch('/setari/mail', function (req, res, next) {
    var decodedToken = jwt.decode(req.query.token);
    User.findById(decodedToken.user._id)
        .then((user) => {
            if (!user) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: userIdError
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

                    User.findByIdAndUpdate(userId, { $set: { email: userNewEmail } }, function (err) {
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

module.exports = router;