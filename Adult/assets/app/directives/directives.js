angular.module('directives', [])
    .directive('videos', function(){
        return{
            restrict: 'E',
            templateUrl: '/assets/app/templates/body/videos.html',
            controller: 'VideoCtrl'
        };
    })
    .directive('category', function () {
        return {
            restrict: 'E',
            templateUrl: '/assets/app/templates/body/category.html',
            controller: 'CategoryCtrl'
        };
    })
    .directive('search', function () {
        return {
            restrict: 'E',
            templateUrl: '/assets/app/templates/body/search.html',
            controller: 'SearchCtrl'
        };
    })
    .directive('login', function () {
        return {
            restrict: 'E',
            templateUrl: '/assets/app/templates/head/login.html',
            controller: 'LoginCtrl'
        };
    })
    .directive('modal', function () {
        return {
            restrict: 'E',
            templateUrl: '/assets/app/templates/head/modal.html',
            controller: 'ModalCtrl'
        };
    })
    .directive('logo', function () {
        return {
            restrict: 'E',
            templateUrl: '/assets/app/templates/head/logo.html'
        };
    });