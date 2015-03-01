angular.module('videoServices', [])
    .service('keywordVideoService', ['$http', '$q', function ($http, $q) {
        var getQueryVideos = function (keywordString) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/Video/queryget/' + keywordString
            }).success(deferred.resolve).error(deferred.reject);
            return deferred.promise.then(
                function (searchResults) {
                    return searchResults;
                },
                function () {
                });
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
        var getMostPinVideos = function (startIndex) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'api/Video/mostpinvideos/' + startIndex
            }).success(deferred.resolve).error(deferred.reject);
            return deferred.promise.then(
                function (videoArray) {
                    return videoArray;
                },
                function () {
                });
        }
        var getMostViewVideos = function (startIndex) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/Video/mostviewvideos/' + startIndex
            }).success(deferred.resolve).error(deferred.reject);
            return deferred.promise.then(
                function (videoArray) {
                    return videoArray;
                },
                function () {
                });
        }
        var getVideos = function (startIndex) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/Video/getvideos/' + startIndex
            }).success(deferred.resolve).error(deferred.reject);
            return deferred.promise.then(
                function (videoArray) {
                    return videoArray;
                },
                function () {
                });
        }
        var getUniqueVideo = function (bsonId) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/Video/getunique/' + bsonId
            }).success(deferred.resolve).error(deferred.reject);
            return deferred.promise.then(
                function (vidObj) {
                    return vidObj;
                },
                function () {
                });
        }

        var getUniqueVideos = function (bsonIds) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/Video/getuniques/',
                params: {bsonIds: bsonIds}
            }).success(deferred.resolve).error(deferred.reject);
            return deferred.promise.then(
                function (videoArray) {
                    return videoArray;
                }, function () {
                }
                );
        }
        return {
            getVideos: getVideos,
            getMostPinVideos: getMostPinVideos,
            getMostViewVideos: getMostViewVideos,
            getUniqueVideo: getUniqueVideo,
            getUniqueVideos: getUniqueVideos
        }
    }]);
    