angular.module('adultApp', ['directives', 'ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/assets/app/templates/dashboard.html'
            });
    });
