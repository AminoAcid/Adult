angular.module('shared.directives', [])
    .directive('scrolltop', function () {
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
    })
    .directive('pinButton', function () {
        return {
            restrict: 'E',
            templateUrl: '/assets/app/templates/submain/pinbutton.html',
            scope: {
                videobsonid: '@',
                title: '@',
                embed: '@'
            },
            controller: 'PinCtrl'
        }
    })
     .directive('navButton', ['historyService', function (historyService) {
         return {
             restrict: 'E',
             templateUrl: '/assets/app/templates/submain/navbutton.html',
             scope: {},
             controller: 'NavCtrl',
             link: function (scope, ele, attrs) {
                 console.log('attrs.direction ' + attrs.direction);
                 if (attrs.direction == undefined) {
                     console.log('Please Indicate attribute: "direction" to values "backward" or "forward"');
                 } else if (attrs.direction.localeCompare('backward') == 0) {
                     console.log("backward hit " + attrs.direction.localeCompare('backward'));
                     scope.isFoward = false;
                     scope.direction = 'backward';
                 } else if (attrs.direction.localeCompare('forward') == 0) {
                     console.log('foward hit ' + attrs.direction.localeCompare('forward'));
                     scope.isFoward = true;
                     scope.direction = 'forward';
                 } else {
                     console.log('Please Indicate attribute: "direction" to values "backward" or "forward"');
                 }
             }
         };
     }]);
