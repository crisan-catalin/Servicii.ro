var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/info/:id', function (req, res, next) {
    User.findOne({ _id: req.params.id })
        .select('-_id name phone experienceYears biography location notificationRange')
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

module.exports = router;
