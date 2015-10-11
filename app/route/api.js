(function () {
    module.exports = function (app) {
        var mongoose = require('mongoose');
        var Article = require('../model/article');

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

        app.put('/api/articles/:slug', function (req, res) {
            var article = req.query;
            Article.findOneAndUpdate({slug: req.query.slug}, article, {upsert: true}, function (error, article) {
                if (error) {
                    res.status(500).send({error: "Update failed", status: 500});
                } else {
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
            var slug = req.params.slug;
            Article.find({slug: slug}).exec(function (err, articles) {
                res.send(articles);
            });
        });
    }
})();