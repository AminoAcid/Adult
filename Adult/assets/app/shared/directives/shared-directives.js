angular.module('shared.directives', [])
    .directive('scrolltop', function(){
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $(element).click(function (event) {
                    event.preventDefault();
                    $('html, body').animate({ scrollTop: 0 }, 300);
                })
            }
        };
    })
    .directive('toolinit', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                 $(element).tooltip();
            }
        };
    });