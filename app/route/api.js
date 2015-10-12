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

        app.post('/api/articles', function (req, res) {
            var article = new Article(req.query);
            article.save(function (error) {
                if (error) {
                    res.status(500).send({error: "Insert failed", status: 500});
                } else {
                    res.send({status: 200, slug: article.slug});
                }
            });
        });

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

        app.delete('/api/articles/:slug', function (req, res) {
            Article.findOneAndRemove({slug: req.params.slug}, function (error, article) {
                if (error) {
                    res.status(500).send({error: "Remove failed", status: 500});
                } else {
                    res.send({status: 200});
                }
            });

        });

        app.get('/api/articles', function (req, res) {
            Article.find(function (err, articles) {
                res.send(articles);
            });
        });

        app.get('/api/articles/:slug', function (req, res) {
            Article.where({slug: req.params.slug}).findOne(function (err, articles) {
                if (articles) {
                    res.send(articles);
                } else {
                    res.status(404).send({error: "Article not found", status: 404});
                }
            });
        });

        app.get('/api/logged', isAuthenticated, function(req, res) {
            return res.send({status: 200});
        });

        app.get('/api/admin', isAuthenticated, isAdmin, function(req, res) {
            return res.send({status: 200});
        });

        app.post('/login', function(req, res) {
            var username = req.query.username;
            var password = req.query.password;

            //console.log(bcrypt.hashSync("aaaaa"));

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

            //function(req, username, password, done) {
            //    // check in mongo if a user with username exists or not
            //    User.findOne({ 'username' :  username },
            //        function(err, user) {
            //            // In case of any error, return using the done method
            //            if (err)
            //                return done(err);
            //            // Username does not exist, log the error and redirect back
            //            if (!user){
            //                console.log('User Not Found with username '+username);
            //                return done(null, false, req.flash('message', 'User Not found.'));
            //            }
            //            // User exists but wrong password, log the error
            //            if (!isValidPassword(user, password)){
            //                console.log('Invalid Password');
            //                return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
            //            }
            //            // User and password both match, return user from done method
            //            // which will be treated like success
            //            return done(null, user);
            //        }
            //    );
            //
            //})
        });
    }
})();