(function() {
    var app = angular.module('app-article-controller', ['app-article-service']);

    app.controller('ArticleCtrl', ['$scope', '$rootScope', 'apiService', function ($scope, $rootScope, apiService) {
        var self = this;
        apiService.getAll()
            .success(function(data) {
                self.articles = data;
            });

    }]);
})();
