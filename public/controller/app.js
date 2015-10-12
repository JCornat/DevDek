(function () {
    var app = angular.module('app', ['ui.router', 'app.article.service', 'app.article.controller', 'ngAnimate', 'ngSanitize', 'app.article.directive', 'app.global.controller', 'app.global.service']);


    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
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
            .state('login', {
                url: '/login',
                views: {
                    '': {templateUrl: '/public/controller/global/view/login.html'}
                }
            })
            .state('404', {
                url: '/404',
                views: {
                    '': {templateUrl: '/public/controller/global/view/404.html'}
                }
            });
        $urlRouterProvider.otherwise('404');
        $locationProvider.html5Mode(true);
    }]);
})();