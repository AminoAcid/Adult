angular.module('directives', [])
    .directive('videos', function(){
        return{
            restrict: 'E',
            templateUrl: '/assets/app/templates/main/videos.html',
            controller: 'VideoCtrl'
        };
    })
    .directive('subVideo', function () {
        return {
            restrict: 'E',
            templateUrl: '/assets/app/templates/submain/subvideo.html',
            controller: 'SubvideoCtrl'
        }
    })
    .directive('category', function () {
        return {
            restrict: 'E',
            templateUrl: '/assets/app/templates/utility/body/category.html',
            controller: 'CategoryCtrl'
        };
    })
    .directive('search', function () {
        return {
            restrict: 'E',
            templateUrl: '/assets/app/templates/utility/body/search.html',
            controller: 'SearchCtrl'
        };
    })
    .directive('login', function () {
        return {
            restrict: 'E',
            templateUrl: '/assets/app/templates/utility/head/login.html',
            controller: 'LoginCtrl'
        };
    })
    .directive('modal', function () {
        return {
            restrict: 'E',
            templateUrl: '/assets/app/templates/utility/head/modal.html',
            controller: 'ModalCtrl'
        };
    })
    .directive('logo', function () {
        return {
            restrict: 'E',
            templateUrl: '/assets/app/templates/head/utility/logo.html'
        };
    });