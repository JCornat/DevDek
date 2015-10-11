(function() {
    module.exports = function(app) {
        var mongoose = require('mongoose');
        var Article = require('../model/article');

        app.post('/api/articles', function(req, res) {
            console.log("CREATE ARTICLE")
        });

        app.get('/api/articles', function(req, res) {
            Article.find(function(err, articles) {
                res.send(articles);
            });
        });

        app.get('/api/articles/:id', function(req, res) {
            Article.find(function(err, articles) {
                res.send(articles);
            });
        });
    }
})();