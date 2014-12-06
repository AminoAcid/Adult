angular.module('trust.html', [])
    .filter('trustHtml', ['$sce', function ($sce) {
        return function(textHtml) {
            return $sce.trustAsHtml(textHtml);
        };
    }]);