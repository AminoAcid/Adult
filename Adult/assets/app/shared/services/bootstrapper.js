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
    .factory('videoBootstrap', ['$http', '$q', function ($http, $q) {
        return {
            getVideo: function () {
                var deffered = $q.defer();
                $http({
                    method: 'GET',
                    url: '/api/Video'
                }).success(deffered.resolve).error(deffered.reject);
                return deffered.promise;
            }
        }
    }]);