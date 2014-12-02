angular.module('adultApp', ['directives', 'controllers', 'tooltip.init','bootstrap', 'ngRoute', 'ngMessages'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/assets/app/templates/dashboard.html',
                controller: 'dashboard'
            });
    });
