(function() {
    module.exports = function(app) {
        var mongoose = require('mongoose');
        var Article = require('../model/article');

        app.post('/api/article', function(req, res) {
            console.log("CREATE ARTICLE")
        });

        app.get('/api/article', function(req, res) {
            Article.find(function(err, articles) {
                res.send(articles);
            });
        });
    }
})();