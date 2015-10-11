(function () {
    var app = angular.module('app', ['ui.router', 'app-article-service', 'app-article-controller', 'ngAnimate', 'ngSanitize', 'app-article-directive']);

    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('articles');
        $stateProvider
            .state('articles', {
                url: '/',
                views: {
                    '': {templateUrl: '/public/controller/article/view/articles.html'},
                    'header@articles': {templateUrl: '/public/view/header.html'}
                }

            })
            .state('add-article', {
                url: '/article/add',
                views: {
                    '': {templateUrl: '/public/controller/article/view/article-form.html'}
                }
            })
            .state('edit-article', {
                url: '/article/:slug/edit',
                views: {
                    '': {templateUrl: '/public/controller/article/view/article-form.html'}
                }
            })
            .state('article', {
                url: '/article/:slug',
                views: {
                    '': {templateUrl: '/public/controller/article/view/article.html'}
                }
            })
            .state('about', {
                // we'll get to this in a bit
            });
        $locationProvider.html5Mode(true);
    }]);
})();