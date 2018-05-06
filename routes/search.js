var express = require('express');
var router = express.Router();

var Ad = require('../models/ad');

router.get('/', function (req, res, next) {
    //TODO: Find a way to compose query from string
    let findPromise;
    if (!req.query.q && !req.query.category && !req.query.lat && !req.query.lng) {
        findPromise = Ad.find({ expirationDate: { $gt: Date.now() }, selectedOffertId: { $eq: null } });
    } else if (req.query.q && req.query.category && req.query.lat && req.query.lng) {
        findPromise = Ad.find({
            expirationDate: { $gt: Date.now() }, selectedOffertId: { $eq: null },
            $or: [{ title: { $regex: req.query.q } }, { description: { $regex: req.query.q } }],
            categoryId: req.query.category,
            'location.lat': { $gt: Math.floor(req.query.lat) - 1, $lt: Math.floor(req.query.lat) + 1 },
            'location.lng': { $gt: Math.floor(req.query.lng) - 1, $lt: Math.floor(req.query.lng) + 1 }
        })
    } else if (req.query.q && req.query.category) {
        findPromise = Ad.find({
            expirationDate: { $gt: Date.now() }, selectedOffertId: { $eq: null },
            $or: [{ title: { $regex: req.query.q } }, { description: { $regex: req.query.q } }],
            categoryId: req.query.category
        })
    } else if (req.query.q && req.query.lat && req.query.lng) {
        findPromise = Ad.find({
            expirationDate: { $gt: Date.now() }, selectedOffertId: { $eq: null },
            $or: [{ title: { $regex: req.query.q } }, { description: { $regex: req.query.q } }],
            'location.lat': { $gt: Math.floor(req.query.lat) - 1, $lt: Math.floor(req.query.lat) + 1 },
            'location.lng': { $gt: Math.floor(req.query.lng) - 1, $lt: Math.floor(req.query.lng) + 1 }
        })
    } else if (req.query.category && req.query.lat && req.query.lng) {
        findPromise = Ad.find({
            expirationDate: { $gt: Date.now() }, selectedOffertId: { $eq: null },
            categoryId: req.query.category,
            'location.lat': { $gt: Math.floor(req.query.lat) - 1, $lt: Math.floor(req.query.lat) + 1 },
            'location.lng': { $gt: Math.floor(req.query.lng) - 1, $lt: Math.floor(req.query.lng) + 1 }
        })
    } else if (req.query.q) {
        findPromise = Ad.find({
            expirationDate: { $gt: Date.now() }, selectedOffertId: { $eq: null },
            $or: [{ title: { $regex: req.query.q } }, { description: { $regex: req.query.q } }]
        })
    } else if (req.query.category) {
        findPromise = Ad.find({
            expirationDate: { $gt: Date.now() }, selectedOffertId: { $eq: null },
            categoryId: req.query.category
        })
    } else if (req.query.lat && req.query.lng) {
        findPromise = Ad.find({
            expirationDate: { $gt: Date.now() }, selectedOffertId: { $eq: null },
            'location.lat': { $gt: Math.floor(req.query.lat) - 1, $lt: Math.floor(req.query.lat) + 1 },
            'location.lng': { $gt: Math.floor(req.query.lng) - 1, $lt: Math.floor(req.query.lng) + 1 }
        })
    }

    if (findPromise) {
        findPromise
            //TODO: Handle image
            .select('_id title description expirationDate location categoryId')
            .populate('categoryId', 'name')
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
    } else {
        res.status(500).json({
            title: 'An error occurred',
            error: error
        });
    }
});

module.exports = router;
