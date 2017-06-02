(function() {

    var infiniteScroll = function() {
        return {
            restrict: 'AE',
            replace: true,
            template: '<div class="clix-infinite-scroll" in-view="$inview && onLoadMore($inview, $inviewInfo)"><clix-loader size="small"></clix-loader></div>',
            scope: {
                onLoadMore: '='
            }
        }
    };

    angular.module('clixtv')
        .directive('clixInfiniteScroll', infiniteScroll);
}());