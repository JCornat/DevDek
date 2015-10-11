(function() {
    var app = angular.module('app', ['ui.router']);

    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/public/view/article.html',
                controller: 'homeCtrl'
            })
            .state('about', {
                // we'll get to this in a bit
            });
        $locationProvider.html5Mode(true);
    }]);

})();