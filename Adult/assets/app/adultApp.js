
angular.module('adultApp', [
    'pinServices',
    'directives',
    'controllers',
    'tooltip.init',
    'videoServices',
    'categoryServices',
    'ngRoute',
    'ngMessages',
    'infinite-scroll',
    'trust.html',
    'category.filter',
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
