angular.module('directives', [])
    .directive('category', function () {
        return {
            restrict: 'E',
            templateUrl: '/assets/app/templates/body/category.html'
        };
    })
    .directive('login', function () {
        return {
            restrict: 'E',
            templateUrl: '/assets/app/templates/head/login.html'
        }
    })
    .directive('logo', function () {
        return {
            restrict: 'E',
            templateUrl: '/assets/app/templates/head/logo.html'
        };
    });