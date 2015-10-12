(function() {
    var app = angular.module('app.article.controller', ['app.article.service', 'app.global.service']);

    app.controller('ArticlesCtrl', ['apiService', function (apiService) {
        var self = this;
        apiService.getAll()
            .success(function(data) {
                self.articles = data;
            });
    }]);

    app.controller('ArticleCtrl', ['apiService', '$stateParams', '$state', function (apiService, $stateParams, $state) {
        var self = this;
        if ($stateParams.slug.trim() == "") {
            $state.go('articles');
        }
        apiService.getOne($stateParams.slug)
            .success(function(data) {
                self.article = data;
            })
            .error(function(e) {
                $state.go('404');
            });
    }]);

    app.controller('ArticleFormCtrl', ['$state', 'apiService', '$stateParams', 'globalService', function ($state, apiService, $stateParams, globalService) {
        var self = this;
        self.slug = $stateParams.slug;

        globalService.isAdmin()
            .error(function() {
                $state.go('articles');
            });

        if (self.slug) {
            apiService.getOne($stateParams.slug)
                .success(function(data) {
                    self.article = data;
                })
                .error(function(e) {
                    $state.go('404');
                });
        } else {
            self.article = {
                publishedAt: Date.now()
            };
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
