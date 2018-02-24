var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Ad = require('../models/ad');
var Offert = require('../models/offert');
var User = require('../models/user');

const HOLDING = 'holding';

router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});

// Oferte primite de la altii
router.get('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Ad.find({ userId: decoded.user._id, expirationDate: { $gt: Date.now() }, selectedOffertId: { $eq: null }, offertsId: { $ne: null } })
        .select('_id categoryId offertsId')
        .populate({
            path: 'offertsId', select: 'offererId price currency description', match: { status: HOLDING },
            populate: { path: 'offererId', select: '_id name phone experienceYears biography location' }
        })
        .populate('categoryId')
        .lean()
        .exec(function (adError, ads) {
            if (adError) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: adError
                });
            }
            res.status(200).json({
                result: ads
            });
        });
});

router.post('/oferta-noua', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    var offert = new Offert({
        adId: req.body.adId,
        adId: adId,
        offererId: decoded.user._id,
        offererId: offerer,
        description: req.body.description,
        price: req.body.price,
        currency: req.body.currency
    });

    offert.save()
        .then((offert) => {
            Ad.findByIdAndUpdate(adId, { $push: { offertsId: offert._id } })
                .then(() => {
                    return res.status(200).json({
                        title: 'Offert sended successfully'
                    });
                })
                .catch((error) => {
                    return res.status(200).json({
                        title: 'Error',
                        error: error
                    });
                });
        })
        .catch((error) => {
            return res.status(400).json({
                title: 'Error',
                error: error
            });
        })
});

module.exports = router;