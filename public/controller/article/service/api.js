(function() {

    var app = angular.module('app.article.service', []);

    app.factory('apiService', ['$http', function($http) {
        return {
            getAll: function(data) {
                return $http({
                    url: '/api/articles',
                    method: 'GET',
                    params: data
                });
            },
            getOne: function(slug) {
                return $http({
                    url: '/api/articles/'+slug,
                    method: 'GET'
                });
            },
            addOne: function(data) {
                return $http({
                    url: '/api/articles',
                    method: 'POST',
                    params: data
                });
            },
            updateOne: function(slug, data) {
                return $http({
                    url: '/api/articles/'+slug,
                    method: 'PUT',
                    params: data
                });
            },
            removeOne: function(slug) {
                return $http({
                    url: '/api/articles/'+slug,
                    method: 'DELETE'
                });
            }
        };
    }]);

})();
