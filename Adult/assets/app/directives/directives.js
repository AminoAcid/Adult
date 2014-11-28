angular.module('directives', [])
    .directive('videos', function(){
        return{

        };
    })
    .directive('category', function () {
        return {
            restrict: 'E',
            templateUrl: '/assets/app/templates/body/category.html'
        };
    })
    .directive('login', function () {
        return {
            restrict: 'E',
            templateUrl: '/assets/app/templates/head/login.html',
            controller: 'LoginCtrl'
        }
    })
    .directive('mainButton', function () {
        return {
            restrict: 'E',
            templateUrl: '/assets/app/templates/head/main-button.html'
        }
    })
    .directive('logo', function () {
        return {
            restrict: 'E',
            templateUrl: '/assets/app/templates/head/logo.html'
        };
    });