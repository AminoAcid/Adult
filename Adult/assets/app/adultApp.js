
angular.module('adultApp', [
    'pinVideo',
    'directives',
    'controllers',
    'tooltip.init',
    'bootstrap',
    'ngRoute',
    'ngMessages',
    'infinite-scroll',
    'trust.html',
    'constants'])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode({enabled:true, requireBase:false});
        $routeProvider
            .when('/', {
                templateUrl: '/assets/app/templates/dashboard.html'
                //controller: 'dashboard'
            });
            
    }]);

//slow down to prevent lag/jerk
angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 250)
