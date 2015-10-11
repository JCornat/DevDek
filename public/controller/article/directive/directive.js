(function () {
    var app = angular.module('app-article-directive', []);

    app.directive('header', ['$window', function ($window) {
        return {
            restrict: 'A',
            link: function(scope, element, attributes) {
                var w = angular.element($window);
                scope.$watch(function () {
                    return {
                        'h': w.height(),
                        'w': w.width()
                    };
                }, function (newValue, oldValue) {
                    scope.windowHeight = newValue.h;
                    scope.windowWidth = newValue.w;

                    scope.resize = function (offsetH) {
                        return {
                            'height': newValue.h + 'px',
                            'background-image': 'url('+attributes["header"]+')'
                        };
                    };

                }, true);

                w.bind('resize', function () {
                    scope.$apply();
                });
            }
        };
    }]);
})();