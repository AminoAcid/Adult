angular.module('tooltip.init', [])
    .directive('toolinit', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                 $(element).tooltip();
            }
        };
    });