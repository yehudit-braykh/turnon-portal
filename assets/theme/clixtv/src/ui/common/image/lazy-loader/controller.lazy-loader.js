(function() {

    var LazyLoaderController = [
        '$scope',
        '$timeout',
        function($scope, $timeout) {
            $scope.containerInView = function($inview, $inviewInfo) {
                if (!$inview) {
                    return;
                }

                // Weird bug where sometimes it fires right as the page content loads...
                if ($inviewInfo && $inviewInfo.elementRect && $inviewInfo.elementRect.left === 0 && $inviewInfo.elementRect.top === 0) {
                    return;
                }

                $scope.imageToLoad = $scope.imageSource;
            };

            $scope.onImageLoad = function() {
                $timeout(function() {
                    $scope.imageLoaded = true;
                }, 250);
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('LazyLoaderController', LazyLoaderController);
}());