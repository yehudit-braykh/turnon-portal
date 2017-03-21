(function() {

    var VIDEO_MARGIN_LEFT = 12;

    var VideoCategoryScrollList = [
        '$scope',
        '$window',
        '$timeout',
        function($scope, $window, $timeout) {

            $scope.left = 0;

            function _resetArrowStates() {
                var minWidth = ((angular.element($scope.scrollListElement).innerWidth() - $window.innerWidth) * -1);
                $scope.leftArrowVisible = $scope.left <= minWidth;
                $scope.rightArrowVisible = $scope.left >= 0;
            }

            function _recalculateWidth() {
                $scope.videoContainerWidth = $window.innerWidth / 5.7;
                $scope.arrowScrollWidth = $scope.videoContainerWidth + VIDEO_MARGIN_LEFT;

                $timeout(function() {
                    $scope.$apply();
                });
            }

            $scope.onPrevious = function() {
                var left = $scope.left + $window.innerWidth;
                if (left >= 0) {
                    left = 0;
                }
                $scope.left = left;
                _resetArrowStates();
            };

            $scope.onNext = function() {
                var left = $scope.left - $window.innerWidth,
                    minLeft = ((angular.element($scope.scrollListElement).innerWidth() - $window.innerWidth) * -1);
                if (left < minLeft) {
                    left = minLeft;
                }
                $scope.left = left;
                _resetArrowStates();
            };

            $scope.$watch('category.videos', function() {
                if (!$scope.category.videos) {
                    return;
                }
                $scope.rightArrowVisible = ($scope.videoContainerWidth + VIDEO_MARGIN_LEFT) * $scope.category.videos.length > $window.innerWidth;
            });

            $scope.carouselConfig = {
                event: {
                    afterChange: function (event, slick, currentSlide, nextSlide) {
                        $scope.leftArrowVisible = currentSlide !== 0;
                        // $scope.rightArrowVisible = (currentSlide );
                        // console.log('slick afterChange', 'currentSlide:', currentSlide, 'nextSlide:', nextSlide);
                    }
                }
            };

            angular.element($window).on('resize.doResize', function () {
                _recalculateWidth();
            });

            _recalculateWidth();
            _resetArrowStates();
        }
    ];

    angular
        .module('clixtv')
        .controller('VideoCategoryScrollList', VideoCategoryScrollList);
}());