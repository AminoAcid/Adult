angular.module('adultApp', ['directives', 'controllers', 'tooltip.init','bootstrap', 'ngRoute', 'ngMessages'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode({enabled:true, requireBase:false});
        $routeProvider
            .when('/', {
                templateUrl: '/assets/app/templates/dashboard.html',
                controller: 'dashboard'
            });
            
    }]);
