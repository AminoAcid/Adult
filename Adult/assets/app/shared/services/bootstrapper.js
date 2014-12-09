var bootstrap = angular.module('bootstrap', [])
    /*
     This is in the view of the Home Index View
     =======================================
     .factory('indexBootstrap', function () {
        return {
            video: @Html.Raw(@Model)
            };
      });
     */
    //.config(['$provide', function ($provide) {
    //    $provide.value('getVideosUrl', '/video');
    //}])

    // [Route("getembed/{BsonIdStrings}")]
    //.factory('videoModalBootstrap', ['$http', '$q', function ($http, $q) {
    //    return {
    //        getEmbed: function (BsonIdStrings) {
    //            var deferred = $q.defer();
    //            $http({
    //                method: 'GET',
    //                url: '/api/Video/getembed' + BsonIdStrings
    //            }).success(deferred.resolve).error(deferred.reject);
    //            return deferred.promise;
    //        }
    //    }
    //}])
    .factory('videoBootstrap', ['$http', '$q', function ($http, $q) {
        return {
            getVideos: function (startIndex) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: '/api/Video/get/'+startIndex
                }).success(deferred.resolve).error(deferred.reject);
                return deferred.promise;
            }
        }
    }]);