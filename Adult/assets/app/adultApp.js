angular.module('adultApp', ['directives', 'tooltip.init', 'ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/assets/app/templates/dashboard.html'
            });
    });
