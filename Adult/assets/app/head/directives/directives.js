angular.module('head.directive', [])
    .directive('header', function () {
        return {
            restrict: 'E',
            templateUrl: '/assets/app/head/templates/header.cshtml'
        };
    });
