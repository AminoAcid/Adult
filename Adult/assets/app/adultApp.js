
angular.module('adultApp', [
    'pinServices',
    'directives',
    'controllers',
    'shared.directives',
    'pagingServices',
    'navigationServices',
    'updateInfoServices',
    'videoServices',
    'relatedServices',
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
                templateUrl: '/assets/app/templates/dashboard/dashboard.html',
                controller: 'DashboardCtrl'
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
