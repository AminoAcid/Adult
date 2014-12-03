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
    .config(['$provide', function ($provide) {
        $provide.value('getVideosUrl', '@Url.Action("Video","Home")');
    }])
    .factory('videoBootstrap', ['$http', '$q', 'getVideosUrl', function ($http, $q, getVideosUrl) {
        return {
            getVideo: function () {
                var deffered = $q.defer();
                $http({
                    method: 'GET',
                    url: getVideosUrl
                }).success(deffered.resolve).error(deffered.reject);
                return deffered.promise;
            }
        }
    }]);