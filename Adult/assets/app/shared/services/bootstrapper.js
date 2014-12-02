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
    .factory('videoBootstrap', ['$http', '$q', function ($http, $q) {
        return {
            getVideo: function () {
                var deffered = $q.defer();
                $http.get('/').success(deffered.resolve).error(deffered.reject);
                return deffered.promise;
            }
        }
    }]);