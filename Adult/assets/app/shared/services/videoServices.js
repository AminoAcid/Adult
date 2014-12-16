var bootstrap = angular.module('videoServices', [])
    /*
     This is in the view of the Home Index View
     =======================================
     .factory('indexBootstrap', function () {
        return {
            video: @Html.Raw(@Model)
            };
      });
     */ 
    .factory('keywordVideoService', ['$http', '$q', function ($http, $q) {
        return {
            getQueryVideos: function (keywordArray) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: '/api/Video/queryget/' + '"' + keywordArray + '"'
                }).success(deferred.resolve).error(deferred.reject);
                return deferred.promise;
            }
        };
    }])
    .factory('generalVideoService', ['$http', '$q', function ($http, $q) {
        return {
            getVideos: function (startIndex) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: '/api/Video/get/' + startIndex
                }).success(deferred.resolve).error(deferred.reject);
                return deferred.promise;
            }
        };
    }]);