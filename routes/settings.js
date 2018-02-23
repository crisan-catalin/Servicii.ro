var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Ad = require('../models/ad');
var Offert = require('../models/offert');

const ACCEPTED = 'accepted';
const HOLDING = 'holding';

// router.use('/', function (req, res, next) {
//     jwt.verify(req.query.token, 'secret', function (err, decoded) {
//         if (err) {
//             return res.status(401).json({
//                 title: 'Not Authenticated',
//                 error: err
//             });
//         }
//         next();
//     })
// });

router.get('/', function (req, res, next) {
    var decodedToken = jwt.decode(req.query.token);
    Ad.find({ userId: decodedToken.user._id, selectedOffertId: { $ne: null } }).exec(function (error, ads) {
        if (error) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        res.status(200).json({
            title: 'User ads',
            ads: ads
        });
    });
});

//TODO: Add token validation
router.get('/oferte', function (req, res, next) {
    Offert.find().lean().exec(function (error, jsonOfferts) {
        if (error) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        var result = {};
        result['accepted'] = [];
        result['holding'] = [];

        for (const offert of jsonOfferts) {
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
    });
});

router.patch('/setari/user-info', function (req, res, next) {
    console.log(req.body);
    const userId = '5a8eab604d600b26646ea943';
    User.findByIdAndUpdate(userId, {
        $set: {
            name: req.body.name,
            phone: req.body.phone,
            location: {
                lat: req.body.lat,
                long: req.body.long
            },
            regularUser: req.body.regularUser,
            experienceYears: req.body.experienceYears,
            biography: req.body.biography
        }
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

//TODO: Add token validation and user id
router.patch('/setari/password', function (req, res, next) {
    User.findByIdAndUpdate('5a770aa846ccb82cbc287826', {
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
    const userId = '5a770aa846ccb82cbc287826';
    User.findById(userId, function (userIdError, user) {
        if (userIdError) {
            return res.status(500).json({
                title: 'An error occurred',
                error: userIdError
            });
        }

        const userNewEmail = 'catalin@yahoo.com';
        // const userNewEmail = req.body.email;
        User.findOne({ email: userNewEmail }, function (userEmailError, result) {
            if (userEmailError) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: userEmailError
                });
            }

            if (!result) {
                User.findByIdAndUpdate(userId, { $set: { email: userNewEmail } }, function (err) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: err
                        });
                    }

                    res.status(200).json({
                        title: 'Email changed successfully'
                    });
                });
            }
            res.status(500).json({
                error: 'Eroare',
                title: 'Email already exist'
            });
        });
    });
});

router.delete('/setari/delete', function (req, res, next) {
    const userId = '5a770aa846ccb82cbc287826';
    User.findByIdAndRemove(userId, function (err, response) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: userIdError
            });
        }
        res.status(200).json({
            title: 'Account deleted successfully'
        });
    });
});

module.exports = router;