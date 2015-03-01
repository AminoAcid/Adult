angular.module('tagServices', [])
    .service('pinTagService', function () {
        var pinnedTags = [];
        var addTag = function (tag) {
            if (pinnedTags.indexOf(tag) === -1)
                pinnedTags = pinnedTags.concat(tag);
            else
                removeTag(tag);
        }
        var removeTag = function (tag) {
            var indexToRemove = pinnedTags.indexOf(tag);
            if (indexToRemove !== -1)
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