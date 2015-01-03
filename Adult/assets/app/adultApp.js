
angular.module('adultApp', [
    'pinServices',
    'directives',
    'controllers',
    'shared.directives',
    'videoServices',
    'categoryServices',
    'ngRoute',
    'ngCookies',
    'LocalStorageModule',
    'ngMessages',
    'infinite-scroll',
    'trust.html',
    'category.filter',
    'constants'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode({enabled:true, requireBase:false});
        $routeProvider
            .when('/', {
                templateUrl: '/assets/app/templates/dashboard/main.html'
                //controller: 'dashboard'
            })
            .when('/watch', {
                templateUrl: '/assets/app/templates/dashboard/submain.html'
            })
            ;
            
    }])
    //settings for localstoragemodule to avoid variable name confliction
    .config(function (localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('Adult');
    })
    ;

//slow down to prevent lag/jerk
angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 250)
