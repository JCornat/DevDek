(function() {
    var app = angular.module('app', ['ui.router', 'app-article-service', 'app-article-controller']);

    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                views: {
                    '': {templateUrl: '/public/view/article.html'},
                    'header': {templateUrl: '/public/view/header.html'}
                }
            })
            .state('about', {
                // we'll get to this in a bit
            });
        $locationProvider.html5Mode(true);
    }]);
})();