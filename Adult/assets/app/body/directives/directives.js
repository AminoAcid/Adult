angular.module('body.directive', [])
    .directive('category', function () {
        return {
            restrict: 'E',
            templateUrl: '/assets/app/body/templates/category.html'
        };
    });