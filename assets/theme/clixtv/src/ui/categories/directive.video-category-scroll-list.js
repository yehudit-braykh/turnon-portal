(function() {
    var videoCategoryScrollList = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/categories/view.video-category-scroll-list.html',
            controller: 'VideoCategoryScrollList',
            scope: {
                category: '=?',
                categoryTitle: '@?',
                categoryVideos: '=?'
            },
            link: function(scope, element) {
                scope.scrollListElement = angular.element(element).find('.video-inner-list-container');

                if (!scope.category) {
                    scope.category = {
                        title: scope.categoryTitle,
                        videos: {
                            videos: scope.categoryVideos
                        }
                    }
                }
            }
        }
    };

    angular.module('clixtv')
        .directive('clixVideoCategoryScrollList', videoCategoryScrollList);
}());