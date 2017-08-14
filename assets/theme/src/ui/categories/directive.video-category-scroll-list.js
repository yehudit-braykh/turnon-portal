(function() {
    var videoCategoryScrollList = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/categories/view.video-category-scroll-list.html',
            controller: 'VideoCategoryScrollList',
            scope: {
                category: '=?',
                categoryTitle: '@?',
                categoryVideos: '=?',
                enableShowMore: '@?',
                viewAllSref: '@?',
                order: '@?'
            },
            link: function(scope, element) {
                scope.scrollListElement = angular.element(element).find('.video-inner-list-container');

                if (!scope.category) {
                    scope.category = {
                        headerLink: false,
                        title: scope.categoryTitle,
                        videos: {
                            videos: scope.categoryVideos
                        }
                    }
                }
            }
        }
    };

    angular.module('turnon')
        .directive('clixVideoCategoryScrollList', videoCategoryScrollList);
}());