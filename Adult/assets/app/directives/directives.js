angular.module('directives', [])
    .directive('category', function () {
        return {
            restrict: 'E',
            templateUrl: '/assets/app/templates/category.html'
        };
    })
    .directive('login', function () {
        return {
            restrict: 'E',
            templateUrl: '/assets/app/templates/login.html'
        }
    })
    .directive('logo', function () {
        return {
            restrict: 'E',
            templateUrl: '/assets/app/templates/logo.html'
        };
    });