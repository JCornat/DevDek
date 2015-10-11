(function() {

    var app = angular.module('app-article-service', []);

    app.factory('apiService', ['$http', function($http) {
        return {
            getAll: function(data) {
                return $http({
                    url: '/api/articles',
                    method: "GET",
                    params: data
                });
            },
            encrypt: function(password, passphrase) {
                return CryptoJS.AES.encrypt(password, passphrase).toString()
            },
            decrypt: function(hash, passphrase) {
                return CryptoJS.AES.decrypt(hash, passphrase).toString(CryptoJS.enc.Utf8);
            }
        };
    }]);

})();
