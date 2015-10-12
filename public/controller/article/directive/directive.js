(function () {
    var app = angular.module('app.article.directive', []);

    app.directive('header', ['$window', function ($window) {
        return {
            restrict: 'A',
            link: function(scope, element, attributes) {
                var window = angular.element($window);
                scope.$watch(function () {
                    return {
                        'height': window.height(),
                        'width': window.width()
                    };
                }, function (newValue, oldValue) {
                    scope.windowHeight = newValue.height;
                    scope.windowWidth = newValue.width;

                    scope.resize = function (offsetH) {
                        if (newValue.width < 768) {
                            return {
                                'height': 350 + 'px',
                                'background-image': 'url('+attributes["header"]+')'
                            };
                        } else {
                            return {
                                'height': newValue.width / 2.25 + 'px',
                                'background-image': 'url('+attributes["header"]+')'
                            };
                        }

                    };
                }, true);

                window.bind('resize', function () {
                    scope.$apply();
                });
            }
        };
    }]);

    app.filter('utc', function(){

        return function(val){
            var date = new Date(val);
            return new Date(date.getUTCFullYear(),
                date.getUTCMonth(),
                date.getUTCDate(),
                date.getUTCHours(),
                date.getUTCMinutes(),
                date.getUTCSeconds());
        };

    });
})();