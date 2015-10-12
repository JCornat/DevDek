(function() {

    var app = angular.module('app.global.service', []);

    app.factory('globalService', ['$http', function($http) {
        return {
            login: function(data) {
                return $http({
                    url: '/login',
                    method: 'POST',
                    params: data
                });
            },
            isLogged: function() {
                return $http({
                    url: '/api/logged',
                    method: 'GET'
                });
            },
            isAdmin: function() {
                return $http({
                    url: '/api/admin',
                    method: 'GET'
                });
            }
        };
    }]);

})();
