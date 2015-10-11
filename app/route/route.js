(function() {
    module.exports = function(app) {
        app.get(/^((?!\/public).)*$/, function(req, res) {
            res.render('index');
        });
    }
})();