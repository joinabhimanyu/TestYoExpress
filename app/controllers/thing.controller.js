var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Thing = mongoose.model('Thing');

module.exports = function(app) {
    app.use('/things', router);
};

router.use(function(req, res, next) {
    if (!req.user)
        return res.redirect('/');
    next();
});

router.get('/', function(req, res, next) {
    try {
        Thing.find(function(err, things) {
            if (err) return next(err);
            res.render('thing/index', {
                user: req.user,
                title: 'Generator-Express MVC',
                message: 'Example of express application',
                things: things
            });
        });
    } catch (error) {
        next(error);
    }
});

router.get('/:id(\\d+[a-z]*)', function(req, res, next) {
    try {
        Thing.findById(req.params.id, function(err, thing) {
            if (err)
                return next(err);
            res.render('thing/thing', {
                user: req.user,
                title: 'Generator-Express MVC',
                thing: thing
            });
        });
    } catch (error) {
        next(error);
    }
});

router.get('/create', function(req, res, next) {
    try {
        var thing = new Thing();
        res.render('thing/create', {
            user: req.user,
            title: 'Generator-Express MVC',
            thing: thing
        });
    } catch (error) {
        next(error);
    }
});

router.post('/create', function(req, res, next) {
    try {
        Thing.create({
            name: req.body.name,
            info: req.body.info
        }, function(err, result) {
            if (err)
                return next(err);
            return res.redirect('/things');
        });
    } catch (error) {
        next(error);
    }
});

router.get('/update/:id(\\d+[a-z]*)', function(req, res, next) {

    try {
        Thing.findById(req.params.id, function(err, thing) {
            if (err)
                return next(err);
            res.render('thing/update', {
                user: req.user,
                title: 'Generator-Express MVC',
                thing: thing
            });
        });
    } catch (error) {
        next(error);
    }
});

router.post('/update/:id(\\d+[a-z]*)', function(req, res, next) {

    try {
        Thing.findById(req.params.id, function(err, thing) {
            if (err)
                return next(err);
            thing.name = req.body.name;
            thing.info = req.body.info;
            thing.save(function(error, result) {
                if (error)
                    return next(err);
                return res.redirect('/things');
            });

        });
    } catch (error) {
        next(error);
    }
});

router.get('/delete/:id(\\d+[a-z]*)', function(req, res, next) {
    try {
        Thing.remove({ _id: req.params.id }, function(err, result) {
            if (err)
                return next(err);
            return res.redirect('/things');
        });
    } catch (error) {
        next(error);
    }
});