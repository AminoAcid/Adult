angular.module('categoryServices', [])
    .factory('getCategoryService', ['$http', '$q', function ($http, $q) {
        return {
            tags: function () {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: '/api/Category/get'
                }).success(deferred.resolve).error(deferred.reject);
                return deferred.promise;
            }
        };
    }])
    .service('pinTagService', function () {
        var pinnedTags = [];
        var addTag = function (tag) {
            pinnedTags = pinnedTags.concat(tag);
        }
        var removeTag = function (tag) {
            var indexToRemove = pinnedTags.indexOf(tag);
            if (indexToRemove > -1)
                pinnedTags.splice(indexToRemove, 1);
        }
        var getTags = function () {
            return pinnedTags;
        }
        return {
            addTag: addTag,
            removeTag: removeTag,
            getTags: getTags
        };
    });
    