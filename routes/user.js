var express = require('express');
var router = express.Router();
let jwt = require('jsonwebtoken');
var fs = require('fs');
var multer = require('multer');

var User = require('../models/user');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/avatars/');
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


router.post('/info/avatar', upload.single('userImage'), function (req, res, next) {
    var decoded = jwt.decode(req.query.token);

    User.findOneAndUpdate({ _id: decoded.user._id }, { $set: { avatar: req.file.path } })
        .then((user) => {
            res.status(200).json({
                title: 'Avatar uploaded successfully'
            });
        })
        .catch((error) => {
            res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        });
});

router.get('/info/avatar', function (req, res, next) {
    let userId;

    if (req.query.userId) {
        userId = req.query.userId;
    } else {
        var decoded = jwt.decode(req.query.token);
        userId = decoded.user._id;
    }

    User.findById(userId)
        .select('-_id avatar')
        .then((user) => {
            if (!user || !fs.existsSync(user.avatar)) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: 'Invalid data for request'
                });
            }

            return res.status(200).send(fs.readFileSync(user.avatar));
        })
        .catch((error) => {
            res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        });
});

router.get('/info/:id', function (req, res, next) {
    User.findOne({ _id: req.params.id })
        .select('-_id name experienceYears biography location notificationRange')
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
