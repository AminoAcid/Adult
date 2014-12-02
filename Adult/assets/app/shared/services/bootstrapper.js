angular.module('bootstrap', [])
    .factory('videoBootstrap', ['$http', '$q', function ($http, $q) {
        return {
            getVideo: function () {
                var deffered = $q.defer();
                $http.get('/').success(deffered.resolve).error(deffered.reject);
                return deffered.promise;
            }
        }
    }]);