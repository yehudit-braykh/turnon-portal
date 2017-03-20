(function() {

    var VideoCategoryScrollList = [
        '$scope',
        '$window',
        '$timeout',
        function($scope, $window, $timeout) {

            function _recalculateWidth() {
                $scope.videoContainerWidth = $window.innerWidth / 5.7;
                $timeout(function() {
                    $scope.$apply();
                });
            }

            angular.element($window).on('resize.doResize', function () {
                _recalculateWidth();
            });

            _recalculateWidth();
        }
    ];

    angular
        .module('clixtv')
        .controller('VideoCategoryScrollList', VideoCategoryScrollList);
}());