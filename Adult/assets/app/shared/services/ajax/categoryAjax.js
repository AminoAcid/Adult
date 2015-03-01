angular.module('categoryAjax', [])
    .factory('getCategoryAjax', ['$http', '$q', function ($http, $q) {
        return {
            getTags: function () {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: '/api/Category/get'
                }).success(deferred.resolve).error(deferred.reject);
                return deferred.promise;
            }
        };
    }]);
    
    