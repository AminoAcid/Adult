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
    .directive('modalinit', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                $(element).on('shown.bs.modal', function () {
                    scope.$apply('getPinnedVideos()');
                });
            }
        }
    })
    .directive('toolinit', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                 $(element).tooltip();
            }
        };
    });
