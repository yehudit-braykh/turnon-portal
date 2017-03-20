(function() {
    var videoCategoryScrollList = function() {
        return {
            restrict: 'AE',
            templateUrl: 'ui/categories/view.video-category-scroll-list.html',
            controller: 'VideoCategoryScrollList',
            scope: {
                category: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixVideoCategoryScrollList', videoCategoryScrollList);
}());