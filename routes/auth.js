var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

const TOKEN = 'secret_token';

router.post('/forgot-password', function (req, res, next) {
    User.findOneAndUpdate({ email: req.body.email }, { $set: { password: bcrypt.hashSync(req.body.password) } })
        .then(() => {
            console.log('Password changed successfully');
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
    User.findOne({ email: req.body.email, password: bcrypt.hashSync(req.body.password, 10) })
        .exec()
        .then((user) => {
            if (!user) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }

            var token = jwt.sign({ user: user }, TOKEN, { expiresIn: 7200 });
            res.status(200).json({
                title: 'Login successfully',
                result: token,
                userId: user._id
            });
        })
        .catch((err) => {
            res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        });
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
                password: bcrypt.hashSync(req.body.password)
            });

            newUser.save()
                .then(() => {
                    res.status(200).json({
                        title: 'Account created successfully',
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