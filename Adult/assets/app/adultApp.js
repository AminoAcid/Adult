angular.module('adultApp', ['directives', 'controllers', 'tooltip.init','bootstrap', 'ngRoute', 'ngMessages'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/assets/app/templates/dashboard.html'
            });
    });
