angular.module('adultApp', ['head.directive', 'body.directive', 'ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/assets/app/body/templates/body.html'
            });
    });
