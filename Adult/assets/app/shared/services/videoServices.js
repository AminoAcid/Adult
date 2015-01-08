angular.module('videoServices', [])
    //categoryService in View/index
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
    }])
    .service('historyService', ['$cookieStore', function ($cookieStore) {
        
        var forward = function () {
            $cookieStore.put('index', ($cookieStore.get('index') || 0) + 1);
            console.log($cookieStore.get('index'));
            //var historyArray = $cookies.get('history') || [];
            //historyArray.push({ title: title, html: html });
            //$cookies.put('history', historyArray);
        }
        var backward = function()
        {
            $cookieStore.put('index', ($cookieStore.get('index') || 1) - 1);
            console.log($cookieStore.get('index'));
        }
        return {
            forward: forward,
            backward: backward
        };
    }]);