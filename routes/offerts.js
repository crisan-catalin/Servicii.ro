var express = require('express');
var router = express.Router();

var Ad = require('../models/ad');
var Offert = require('../models/offert');
var User = require('../models/user');

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

// Oferte primite
router.get('/', function (req, res, next) {
    const userId = '5a8eab604d600b26646ea943';
    // Ad.find({ userId: userId, selectedOffertId: { $ne: null } }).select('_id categoryId offertsId').populate('offertsId').lean().exec(function (adError, ads) {

    Ad.find({ userId: userId })
        .select('_id categoryId offertsId')
        .populate({ path: 'offertsId', match: { status: HOLDING } })
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


            //How shoud looks:

            // adId: ad._id,
            // categoryId: ad.categoryId,
            // offerer: {
            //     id: user._id,
            //     name: user.name,
            //     biography: user.biography,
            //     experienceYears: user.experienceYears,
            //     telephone: user.telephone,
            //     location: {
            //         lat: user.location.lat,
            //         long: user.location.long
            //     }
            // },
            // price: offert.price,
            // currency: offert.currency,
            // description: offert.description}
        });
});

router.post('/oferta-noua', function (req, res, next) {
    console.log("REQUEST OFERTA!");

    var offert2 = new Offert({
        description: 'Alt anunt. Pentru aceasta cerere va pot oferii un serviciu la un pret bun. La doar 9999Lei si va repar toata casa.',
        price: 799,
        currency: 'RON',
        status: 'accepted'
    });

    offert2.save(function (err, result) {
        res.status(200).json({
            title: 'Oferta 2',
            result: result
        });
    });
});

module.exports = router;