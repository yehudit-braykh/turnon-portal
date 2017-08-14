(function() {

    var VIDEO_MARGIN_LEFT = 6;

    var VideoCategoryScrollList = [
        '$scope',
        '$rootScope',
        '$window',
        '$timeout',
        function($scope, $rootScope, $window, $timeout) {

            // $scope.left = 0;
            //
            // if ($scope.viewAllSref) {
            //     $scope.sref = $scope.viewAllSref;
            // } else if ($scope.category) {
            //     $scope.sref = 'category({ slug: \'{{' + $scope.category.title + ' | slug}}\' })';
            // } else {
            //     $scope.sref = 'home';
            // }
            //
            // function _resetArrowStates() {
            //     var minWidth = ((angular.element($scope.scrollListElement).innerWidth() - $window.innerWidth) * -1);
            //     $scope.leftArrowVisible = $scope.left <= minWidth;
            //     $scope.rightArrowVisible = $scope.left >= 0;
            // }
            //
            // function _recalculateWidth() {
            //
            //     var splitWidth = 2;
            //
            //     if ($window.innerWidth > 480) {
            //         splitWidth = 3.7;
            //     }
            //
            //     if ($window.innerWidth > 992) {
            //         splitWidth = 3.7;
            //     }
            //
            //     if ($window.innerWidth > 1200) {
            //         splitWidth = 5.7;
            //     }
            //
            //     $scope.videoContainerWidth = ($window.innerWidth - VIDEO_MARGIN_LEFT) / splitWidth;
            //     $scope.arrowScrollWidth = $scope.videoContainerWidth + VIDEO_MARGIN_LEFT;
            //
            //     $timeout(function() {
            //         $scope.$apply();
            //         $rootScope.$broadcast('thumbnail.resize');
            //     });
            // }
            //
            // $scope.onPrevious = function() {
            //     var left = $scope.left + $window.innerWidth;
            //     if (left >= 0) {
            //         left = 0;
            //     }
            //     $scope.left = left;
            //     _resetArrowStates();
            // };
            //
            // $scope.onNext = function() {
            //     var left = $scope.left - $window.innerWidth,
            //         minLeft = ((angular.element($scope.scrollListElement).innerWidth() - $window.innerWidth) * -1);
            //     if (left < minLeft) {
            //         left = minLeft;
            //     }
            //     $scope.left = left;
            //     _resetArrowStates();
            // };
            //
            // $scope.$watch('categoryVideos', function() {
            //     if (!$scope.categoryVideos) {
            //         return;
            //     }
            //     $scope.rightArrowVisible = ($scope.videoContainerWidth + VIDEO_MARGIN_LEFT) * $scope.categoryVideos.length > $window.innerWidth;
            // });
            //
            // $scope.carouselConfig = {
            //     event: {
            //         afterChange: function (event, slick, currentSlide, nextSlide) {
            //             $scope.leftArrowVisible = currentSlide !== 0;
            //             angular.element(window).trigger("checkInView");
            //             // $scope.rightArrowVisible = (currentSlide );
            //             // console.log('slick afterChange', 'currentSlide:', currentSlide, 'nextSlide:', nextSlide);
            //         }
            //     }
            // };
            //
            // angular.element($window).on('resize.doResize', function () {
            //     _recalculateWidth();
            // });
            //
            // _recalculateWidth();
            // _resetArrowStates();
        }
    ];

    angular
        .module('turnon')
        .controller('VideoCategoryScrollList', VideoCategoryScrollList);
}());
