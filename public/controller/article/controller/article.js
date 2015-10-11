(function() {
    var app = angular.module('app-article-controller', ['app-article-service']);

    app.controller('ArticlesCtrl', ['$scope', '$rootScope', 'apiService', function ($scope, $rootScope, apiService) {
        var self = this;
        apiService.getAll()
            .success(function(data) {
                self.articles = data;
            });

    }]);

    app.controller('ArticleCtrl', ['$scope', '$rootScope', 'apiService', '$stateParams', function ($scope, $rootScope, apiService, $stateParams) {
        var self = this;
        apiService.getOne($stateParams.slug)
            .success(function(data) {
                self.article = data[0];
            });
    }]);

    app.controller('ArticleFormCtrl', ['$scope', '$rootScope', 'apiService', '$stateParams', function ($scope, $rootScope, apiService, $stateParams) {
        var self = this;
        var slug = $stateParams.slug;
        if (slug) {
            apiService.getOne($stateParams.slug)
                .success(function(data) {
                    self.article = data[0];
                });
        } else {
            self.article = {};
        }

        this.submit = function() {
            if (slug) {
                apiService.updateOne(slug, self.article)
                    .success(function(data) {

                    });
            } else {
                apiService.addOne(self.article)
                    .success(function(data) {

                    });
            }
            console.log(self.article);
        }
    }]);
})();
