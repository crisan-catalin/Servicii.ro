var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Ad = require('../models/ad');
var Offert = require('../models/offert');
var User = require('../models/user');

const TOKEN = 'secret_token';
const HOLDING = 'holding';
const ACCEPTED = 'accepted';
const DENIED = 'denied';

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

// Oferte primite de la altii
router.get('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Ad.find({ userId: decoded.user._id, expirationDate: { $gt: Date.now() }, selectedOffertId: { $eq: null }, offertsId: { $ne: [] } })
        .select('_id title categoryId offertsId')
        .populate({
            path: 'offertsId', select: 'offererId price currency description', match: { status: HOLDING },
            populate: { path: 'offererId', select: '_id name phone experienceYears biography location' }
        })
        .populate('categoryId', '-_id name')
        .lean()
        .then((ads) => {
            let result = [];
            for (const ad of ads) {
                for (const offert of ad.offertsId) {
                    let tempOffert = {
                        ad: {
                            id: ad._id,
                            title: ad.title,
                            categoryName: ad.categoryId.name
                        },
                        offert: offert
                    }
                    result.push(tempOffert);
                }
            }
            return res.status(200).json({
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

//Ofertele mele acceptate
router.get('/accepted', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Offert.find({ offererId: decoded.user._id, status: ACCEPTED })
        .select('adId description price currency')
        .populate({
            path: 'adId', select: '_id userId title categoryId expirationDate',
            populate: { path: 'categoryId', select: '-_id name' }
        })
        .then((offerts) => {
            return res.status(200).json({
                result: offerts
            });
        })
        .catch((error) => {
            return res.status(200).json({
                title: 'Error',
                error: error
            });
        });
});

//Ofertele mele in asteptare
router.get('/holding', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Offert.find({ offererId: decoded.user._id, status: HOLDING })
        .select('adId description price currency')
        .populate({
            path: 'adId', select: '_id title categoryId expirationDate',
            populate: { path: 'categoryId', select: '-_id name' }
        })
        .then((offerts) => {
            return res.status(200).json({
                result: offerts
            });
        })
        .catch((error) => {
            return res.status(200).json({
                title: 'Error',
                error: error
            });
        });
});

router.delete('/sterge-oferta/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Offert.findOneAndRemove({ _id: req.params.id, offererId: decoded.user._id })
        .then(() => {
            return res.status(200).json({
                title: 'Offert removed successfully'
            });
        })
        .catch((error) => {
            return res.status(200).json({
                title: 'Error',
                error: error
            });
        });
});

router.post('/oferta-noua', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    var offert = new Offert({
        adId: req.body.adId,
        offererId: decoded.user._id,
        description: req.body.description,
        price: req.body.price,
        currency: req.body.currency,
        status: HOLDING
    });

    offert.save()
        .then((offert) => {
            Ad.findByIdAndUpdate(offert.adId, { $push: { offertsId: offert._id } })
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

router.patch('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Ad.findOneAndUpdate(
        { _id: req.body.adId, userId: decoded.user._id, selectedOffertId: { $eq: null }, offertsId: req.params.id, },
        { $set: { selectedOffertId: req.params.id } }
    )
        .then((ad) => {
            console.log(ad);
            if (!ad) {
                return res.status(200).json({
                    title: 'Error',
                    error: 'No ad found'
                });
            }

            Offert.findByIdAndUpdate(req.params.id, { $set: { status: ACCEPTED } })
                .then(() => {
                    Offert.update({ adId: req.body.adId, status: { $ne: ACCEPTED } }, { status: DENIED }, { multi: true })
                        .catch((error) => {
                            return res.status(200).json({
                                title: 'Error',
                                error: error
                            });
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
            return res.status(200).json({
                title: 'Error',
                error: error
            });
        });
});

module.exports = router;