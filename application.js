var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var appRoutes = require('./routes/app');
var userRoutes = require('./routes/user');
var settingsRoutes = require('./routes/settings');
var offertsRoutes = require('./routes/offerts');
var reviewRoutes = require('./routes/review');
var authRoutes = require('./routes/auth');
var searchRoutes = require('./routes/search');
var adRoutes = require('./routes/ad');
var categoryRoutes = require('./routes/category');

var app = express();
mongoose.Promise = global.Promise;
// Azure
mongoose.connect('mongodb://servicii-ro-db:2Rse3XOsuOQbm7bnOmkwr50TfiEKOENujVeT0Cly4ANcmzt6K67xkCz0xRR1LdsRhxg02OVeRbnL4dOzYEdcsQ==@servicii-ro-db.documents.azure.com:10255/?ssl=true');

// mLab
// mongoose.connect('mongodb://catalin123:catalin123@ds016108.mlab.com:16108/mean_project');
mongoose.connection.on('error', console.error.bind(console, 'Mongo error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/api/my-account', settingsRoutes);
app.use('/api/oferte', offertsRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/anunturi', adRoutes);
app.use('/api/categorii', categoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;
