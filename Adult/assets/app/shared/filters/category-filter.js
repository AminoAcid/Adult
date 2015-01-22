angular.module('category.filter', [])
    .filter('tagFilter', function () {
        return function (videos, tags) {
            if (!tags || tags.length == 0) {
                return videos;
            }
            else {
                console.log("tag has size " + tags.length);
                var filtered = [];
                for (var i = 0; i < videos.length; i++) {
                    for (var j = 0; j < tags.length; j++) {
                        if (videos[i].maintags.indexOf(tags[j]) != -1 || videos[i].subtags.indexOf(tags[j]) != -1) {
                            filtered.push(videos[i]);
                            break;
                        }
                    }
                }
                return filtered;
            }
        }
    });