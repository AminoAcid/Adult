angular.module('body.directives', [])
    .directive('allVideo', function () {
        return {
            restrict: 'E',
            templateURL: 'hello'//'/assets/app/body/templates/videos.html'
        };
    });