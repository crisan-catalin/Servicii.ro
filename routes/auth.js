var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

const TOKEN = 'secret_token';
const TOKEN_EXPIRATION = 7200;

router.get('/info/:id', function (req, res, next) {
    User.findOne({ _id: req.params.id })
        .select('-_id name phone experienceYears description')
        .then((user) => {
            res.status(200).json({
                result: user
            });
        })
        .catch((error) => {
            res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        });
});

router.post('/forgot-password', function (req, res, next) {
    User.findOneAndUpdate({ email: req.body.email }, { $set: { password: bcrypt.hashSync(req.body.password) } })
        .then(() => {
            res.status(200).json({
                title: 'Password changed successfully'
            });
        })
        .catch((error) => {
            res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        });
});

router.post('/login', function (req, res, next) {
    if (req.body.email && req.body.password) {
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (!user) {
                    return res.status(401).json({
                        title: 'Login failed',
                        error: { message: 'Invalid login credentials' }
                    });
                }

                if (!bcrypt.compareSync(req.body.password, user.password)) {
                    return res.status(401).json({
                        title: 'Login failed',
                        error: { message: 'Invalid login credentials' }
                    });
                }

                var token = jwt.sign({ user: user }, TOKEN, { expiresIn: 7200 });
                return res.status(200).json({
                    title: 'Login successfully',
                    token: token,
                    tokenExpiration: Date.now() + TOKEN_EXPIRATION * 1000,
                    userId: user._id
                });
            })
            .catch((err) => {
                return res.status(502).json({
                    title: 'An error occurred',
                    error: err
                });
            });
    } else {
        res.status(503).json({
            title: 'No data provided',
            error: err
        });
    }
});

router.post('/signup', function (req, res, next) {
    User.findOne({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user) {
                return res.status(500).json({
                    title: 'Email is already used',
                });
            }
            const newUser = new User({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password),
                name: req.body.name,
                phone: req.body.phone,
                location: req.body.location
            });

            newUser.save()
                .then((user) => {
                    var token = jwt.sign({ user: user }, TOKEN, { expiresIn: 7200 });
                    res.status(200).json({
                        title: 'Account created successfully',
                        token: token,
                        tokenExpiration: Date.now() + TOKEN_EXPIRATION * 1000,
                        userId: user._id
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                });
        })
        .catch((error) => {
            res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        });
});

module.exports = router;