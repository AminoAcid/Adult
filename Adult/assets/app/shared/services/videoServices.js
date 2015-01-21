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
        var getVideos = function (startIndex) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/Video/get/' + startIndex
            }).success(deferred.resolve).error(deferred.reject);
            return deferred.promise;
        }
        var getUniqueVideo = function (bsonId) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'api/Video/getunique/' + bsonId
            }).success(deferred.resolve).error(deferred.reject);
            return deferred.promise;
        }
        return {
            getVideos: getVideos,
            getUniqueVideo: getUniqueVideo
        }
    }]);
    