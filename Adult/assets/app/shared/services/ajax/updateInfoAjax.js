angular.module('updateInfoAjax', [])
    .service('updateCountAjax', ['$q', '$http', function ($q, $http) {
        updateViewCount = function (BsonId) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: '/api/Video/incrementview/' + BsonId
            }).success(deferred.resolve).error(deferred.reject);
            return deferred.promise;
        }
        updatePinCount = function (BsonId) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: '/api/Video/incrementpin/' + BsonId
            }).success(deferred.resolve).error(deferred.reject);
            return deferred.promise;
        }
        return {
            updateViewCount: updateViewCount,
            updatePinCount: updatePinCount
        };
    }]);