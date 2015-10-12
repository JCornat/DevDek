(function() {
    var app = angular.module('app.global.controller', ['app.global.service']);

    app.controller('NotFoundCtrl', function () {
        var self = this;
    });

    app.controller('LoginCtrl', ['globalService', '$state', function(globalService, $state) {
        var self = this;

        globalService.isLogged()
            .success(function() {
                $state.go('articles');
            });

        self.login = function() {
            globalService.login(self.user)
                .success(function(data) {
                    $state.go('articles');
                })
                .error(function(error) {
                    self.error = error;
                    console.log("Error");
                    console.log(error);
                });
        }
    }]);
})();

