(function() {
    var app = angular.module('app-article-controller', ['app-article-service']);

    app.controller('ArticlesCtrl', ['apiService', function (apiService) {
        var self = this;
        apiService.getAll()
            .success(function(data) {
                self.articles = data;
            });

    }]);

    app.controller('ArticleCtrl', ['apiService', '$stateParams', function (apiService, $stateParams) {
        var self = this;
        apiService.getOne($stateParams.slug)
            .success(function(data) {
                self.article = data[0];
            });
    }]);

    app.controller('ArticleFormCtrl', ['$state', 'apiService', '$stateParams', function ($state, apiService, $stateParams) {
        var self = this;
        self.slug =$stateParams.slug;
        if (self.slug) {
            apiService.getOne($stateParams.slug)
                .success(function(data) {
                    self.article = data[0];
                });
        } else {
            self.article = {};
        }

        this.submit = function() {
            if (self.slug) {
                apiService.updateOne(self.slug, self.article)
                    .success(function(data) {
                        $state.go('article', {slug: data.slug});
                    });
            } else {
                apiService.addOne(self.article)
                    .success(function(data) {
                        $state.go('article', {slug: data.slug});
                    });
            }
        };

        this.delete = function() {
            apiService.removeOne(self.slug)
                .success(function(data) {
                    $state.go('articles');
                });
        };
    }]);
})();
