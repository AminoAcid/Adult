angular.module('videoServices', [])
    .service('keywordVideoService', ['$http', '$q', function ($http, $q) {
        var getQueryVideos = function (keywordString) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/Video/queryget/' + keywordString 
            }).success(deferred.resolve).error(deferred.reject);
            return deferred.promise;
        }
        var getRelatedVideos = function (keywordString) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/Video/relatedget/' + keywordString
            }).success(deferred.resolve).error(deferred.reject);
            return deferred.promise;
        }
        return {
            getQueryVideos: getQueryVideos,
            getRelatedVideos: getRelatedVideos
        };
    }])
    .service('generalVideoService', ['$http', '$q', function ($http, $q) {
        var getVideos = function (startIndex) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/Video/get/' + startIndex
            }).success(deferred.resolve).error(deferred.reject);
            return deferred.promise;
        }
        var getUniqueVideo = function (bsonId) {
            console.log(bsonId);
            console.log(typeof bsonId);
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'api/Video/getunique/' + bsonId
            }).success(deferred.resolve).error(deferred.reject);
            return deferred.promise;
        }
        return{
            getVideos: getVideos,
            getUniqueVideo: getUniqueVideo
        }
    }])
    .service('historyService', ['$cookieStore', 'pageState', 'generalVideoService', function ($cookieStore, pageState, generalVideoService) {
        var newForward = function (vid) {
            pageState.newForwardState();

            var browseHistory = $cookieStore.get('browseHistory') || [];
            var pageNumber = $cookieStore.get('pageNumber');
            
            if (browseHistory.length >= pageNumber) {
                //BrowseHistoryIndex = pageNumber-1     
                //pageNumber 1 - 1 ratio with browseHistory.length, therefore, add ensure atleast 1 subtraction
                browseHistory.splice(pageNumber-1, browseHistory.length+1 - pageNumber, vid._id);
            } else {
                browseHistory.push(vid._id);
            }
            console.log(browseHistory);
            console.log(pageNumber);
            $cookieStore.put('browseHistory', browseHistory);
        }
        var forward = function () {
            pageState.forwardState();

            var pageNumber = ($cookieStore.get('pageNumber'));
            var browseHistory = $cookieStore.get('browseHistory') || [];

            if (pageNumber <= browseHistory.length) {
                generalVideoService.getUniqueVideo(browseHistory[pageNumber - 1]).then(
                    function (vidObj) {
                        $cookieStore.put('currentVideo', vidObj);
                    },
                    function () {
                        console.log("failed ajax call of getUniqueVideo");
                    });
                console.log(pageNumber);
                return $cookieStore.get('currentVideo');
            }
        }
        var backward = function() {
            pageState.backwardState();

            var pageNumber = $cookieStore.get('pageNumber');

            if (pageNumber > 0) {
                var browseHistory = $cookieStore.get('browseHistory');
                generalVideoService.getUniqueVideo(browseHistory[pageNumber - 1]).then(
                    function (vidObj) {
                        $cookieStore.put('currentVideo', vidObj);
                    },
                    function () {
                        console.log("failed ajax call of getUniqueVideo");
                    });
                console.log(pageNumber);
                return $cookieStore.get('currentVideo');
            }
        }
        return {
            newForward: newForward,
            forward: forward,
            backward: backward
        };
    }]);