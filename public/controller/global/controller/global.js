(function() {
    var app = angular.module('app.global.controller', ['app.global.service']);

    app.controller('NotFoundCtrl', function () {
        var self = this;
    });

    app.controller('LoginCtrl', ['globalService', function(globalService) {
        var self = this;
        self.login = function() {
            globalService.login(self.user)
                .success(function(data) {
                    console.log("data");
                })
                .error(function(error) {
                    console.log("Error");
                    console.log(error);
                });
        }
    }]);
})();

