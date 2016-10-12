var express = require('express');
var passport = require('passport');
var Account = require('../models/account.model');
var router = express.Router();

module.exports = function(app) {
    app.use('/', router);
};

router.get('/', function(req, res) {
    res.render('account/index', { user: req.user, title: 'Generator-Express MVC' });
});

router.get('/register', function(req, res) {
    res.render('account/register', { title: 'Generator-Express MVC' });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account: account, title: 'Generator-Express MVC' });
        }

        passport.authenticate('local')(req, res, function() {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('account/login', { user: req.user, title: 'Generator-Express MVC' });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res) {
    res.status(200).send("pong!");
});