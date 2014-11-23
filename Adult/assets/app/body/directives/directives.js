
angular.module('body.directives', [])
    .directive('allVideo', function () {
        return {
            restrict: 'E',

            templateUrl: '~/assets/app/body/templates/videos.cshtml'
      
        };
    });