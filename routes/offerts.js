var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');

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
            path: 'offertsId', select: '_id offererId price currency description', match: { status: HOLDING },
            populate: {
                path: 'offererId', select: '_id name phone experienceYears biography location certificates',
                populate: { path: 'certificates', select: 'categoryId' }
            }
        })
        .populate('categoryId', '-_id name')
        .lean()
        .then((ads) => {
            let result = [];

            for (const ad of ads) {
                for (const offert of ad.offertsId) {
                    let tempOffert = {
                        id: offert._id,
                        adId: ad._id,
                        adTitle: ad.title,
                        categoryName: ad.categoryId.name,
                        offererId: offert.offererId._id,
                        offererName: offert.offererId.name,
                        description: offert.description,
                        price: offert.price,
                        currency: offert.currency,
                        certification: offert.offererId.certificates && offert.offererId.certificates.categoryId == ad.categoryId._id ? true : false
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

//Oferte primite acceptate
router.get('/solved', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Ad.find({ userId: decoded.user._id, selectedOffertId: { $ne: null } })
        .select('_id title categoryId selectedOffertId')
        .populate({
            path: 'selectedOffertId', select: '-_id offererId price currency description reviewId', match: { status: ACCEPTED },
            populate: { path: 'offererId', select: '_id name' },

            // TODO: Find a solution for sort all document
            options: { sort: { 'reviewId': 1, '_id': -1 } }
        })
        .populate('categoryId', '-_id name')
        .lean()
        .then((ads) => {
            let result = [];

            for (const ad of ads) {
                let offert = {
                    _id: ad.selectedOffertId._id,
                    adId: ad._id,
                    adTitle: ad.title,
                    categoryName: ad.categoryId.name,
                    offererId: ad.selectedOffertId.offererId._id,
                    offererName: ad.selectedOffertId.offererId.name,
                    description: ad.selectedOffertId.description,
                    price: ad.selectedOffertId.price,
                    currency: ad.selectedOffertId.currency,
                    reviewId: ad.selectedOffertId.reviewId ? ad.selectedOffertId.reviewId : null
                }
                result.push(offert);
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

router.get('/count', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Ad.find({ userId: decoded.user._id, expirationDate: { $gt: Date.now() }, selectedOffertId: { $eq: null }, offertsId: { $ne: [] } })
        .select('-_id offertsId')
        .populate({
            path: 'offertsId', select: '_id', match: { status: HOLDING }
        })
        .lean()
        .then((ads) => {
            let count = 0;

            for (const ad of ads) {
                for (const offert of ad.offertsId) {
                    count += 1;
                }
            }

            return res.status(200).json({
                result: count
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

router.patch('/aprobat/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Ad.findOneAndUpdate(
        { _id: req.body.adId, userId: decoded.user._id, selectedOffertId: { $eq: null }, offertsId: req.params.id, },
        { $set: { selectedOffertId: req.params.id } }
    )
        .populate('userId', '-_id name phone email')
        .populate('categoryId', '-_id name')
        .then((ad) => {
            if (!ad) {
                return res.status(200).json({
                    title: 'Error',
                    error: 'No ad found'
                });
            }

            Offert.findByIdAndUpdate(req.params.id, { $set: { status: ACCEPTED } })
                .then(() => {
                    Offert.update({ adId: req.body.adId, status: { $ne: ACCEPTED } }, { status: DENIED }, { multi: true })
                        .then(() => {
                            // sendApprovedOffertMailTo(ad.userId.email, ad._id, ad.title, ad.categoryId.name, ad.userId.name, ad.userId.phone);
                            sendApprovedOffertMailTo('catacrisan_catacrsn@yahoo.com', ad._id, ad.title, ad.categoryId.name, ad.userId.name, ad.userId.phone);

                            return res.status(200).json({
                                title: 'Offert accepted successfully'
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
        })
        .catch((error) => {
            return res.status(200).json({
                title: 'Error',
                error: error
            });
        });
});

router.patch('/respins/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Ad.findOne(
        { _id: req.body.adId, userId: decoded.user._id, selectedOffertId: { $eq: null }, offertsId: req.params.id, }
    )
        .then((ad) => {
            if (!ad) {
                return res.status(200).json({
                    title: 'Error',
                    error: 'No ad found'
                });
            }

            Offert.findOneAndUpdate({ _id: req.params.id, adId: req.body.adId }, { $set: { status: DENIED } })
                .then(() => {
                    return res.status(200).json({
                        title: 'Offert denied successfully'
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

//TODO: Create controller for this
function sendApprovedOffertMailTo(email, adId, adTitle, categoryName, userName, userPhone) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sibiu.servicii.ro@gmail.com',
            pass: 'servicii.ro'
        }
    });

    transporter.use('compile', hbs({
        viewPath: 'public/mail-templates',
        extName: '.hbs'
    }));

    var mailOptions = {
        from: 'sibiu.servicii.ro@gmail.com',
        to: email,
        subject: 'Oferta propusa a fost acceptata',
        template: 'offert-accepted.template',
        context: {
            adId: adId,
            adTitle: adTitle,
            categoryName: categoryName,
            userName: userName,
            userPhone: userPhone
        }
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = router;