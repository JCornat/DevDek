(function () {


    var isAdmin = function (req, res, next) {
        if (req.session.admin) {
            return next();
        } else {
            res.status(403).send({error: "Forbidden", status: 403});
        }
        // if user is authenticated in the session, call the next() to call the next request handler
        // Passport adds this method to request object. A middleware is allowed to add properties to
        // request and response objects
        //if (req.isAuthenticated())
        //    return next();
        // if the user is not authenticated then redirect him to the login page
        //res.redirect('/');
    };

    var isAuthenticated = function (req, res, next) {
        console.log(req.session);
        if (req.session.logged) {
            return next();
        } else {
            res.status(401).send({error: "Unauthorized", status: 401});
        }
        // if user is authenticated in the session, call the next() to call the next request handler
        // Passport adds this method to request object. A middleware is allowed to add properties to
        // request and response objects
        //if (req.isAuthenticated())
        // if the user is not authenticated then redirect him to the login page
        //res.redirect('/');
    };

    module.exports = function (app) {
        var mongoose = require('mongoose');
        var Article = require('../model/article');
        var User = require('../model/user');
        var bcrypt = require('bcrypt-nodejs');

        //Get all articles
        app.get('/api/articles', function (req, res) {
            Article.find().sort({publishedAt: 'desc'}).limit(10).exec(function (err, articles) {
                res.send(articles);
            });
        });

        //Get one article
        app.get('/api/articles/:slug', function (req, res) {
            Article.where({slug: req.params.slug}).findOne(function (err, articles) {
                if (articles) {
                    res.send(articles);
                } else {
                    res.status(404).send({error: "Article not found", status: 404});
                }
            });
        });

        //Add article
        app.post('/api/articles', isAuthenticated, isAdmin, function (req, res) {
            var article = new Article(req.query);
            article.save(function (error) {
                if (error) {
                    res.status(500).send({error: "Insert failed", status: 500});
                } else {
                    res.send({status: 200, slug: article.slug});
                }
            });
        });

        //Update article
        app.put('/api/articles/:slug', isAuthenticated, isAdmin, function (req, res) {
            var article = req.query;
            Article.findOneAndUpdate({slug: req.params.slug}, article, {upsert: true}, function (error) {
                if (error) {
                    res.status(500).send({error: "Update failed", status: 500});
                } else {
                    console.log(article.slug);
                    res.send({status: 200, slug: article.slug});
                }
            });
        });

        //Delete article
        app.delete('/api/articles/:slug', isAuthenticated, isAdmin, function (req, res) {
            Article.findOneAndRemove({slug: req.params.slug}, function (error, article) {
                if (error) {
                    res.status(500).send({error: "Remove failed", status: 500});
                } else {
                    res.send({status: 200});
                }
            });

        });

        //Check if logged
        app.get('/api/logged', isAuthenticated, function(req, res) {
            return res.send({status: 200});
        });

        //Check if admin
        app.get('/api/admin', isAuthenticated, isAdmin, function(req, res) {
            return res.send({status: 200});
        });

        //Login
        app.post('/login', function(req, res) {
            var username = req.query.username;
            var password = req.query.password;

            User.findOne({username: username}, function(err, user) {
                if (!user || err) {
                    return res.status(500).send({error: "User not found", status: 500});
                }
                if (!bcrypt.compareSync(password, user.password)) {
                    return res.status(500).send({error: "Wrong password", status: 500});
                }
                req.session.logged = true;
                req.session.username = username;
                if (user.admin) {
                    req.session.admin = true;
                }
                res.send({status: 200});
            });
        });
    }
})();