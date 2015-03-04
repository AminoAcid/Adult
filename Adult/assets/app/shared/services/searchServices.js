angular.module('searchServices', [])
    .service('queryServices', ['$rootScope', 'keywordVideoAjax', 'videoConstants', function ($rootScope, keywordVideoAjax, videoConstants) {
        var _queryBank = [];
        var _queryVideos = [];

        var initQueryBank = function (keywords) {
            _startIndex = 0;
            _queryVideos = [];
            keywordVideoAjax.getQueryVideos(keywords).then(
                function (videoArray) {
                    _queryBank = videoArray;
                    $rootScope.$broadcast('queryEvent');
                });
        }

        var getQueryVideos = function () {
            _queryVideos = _queryVideos.concat(_queryBank.splice(0, videoConstants.AMOUNT_PER_LOAD));
            return _queryVideos;
        }
        
        return {
            initQueryBank: initQueryBank,
            getQueryVideos: getQueryVideos
        }
    }]);