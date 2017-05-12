(function() {

    var HomeController = [
        '$q',
        '$scope',
        '$rootScope',
        '$timeout',
        '$window',
        '$uibModal',
        'categoryService',
        'modalService',
        function($q, $scope, $rootScope, $timeout, $window, $uibModal, categoryService, modalService) {

            $scope.showMobileCarousel = false;

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
            });

            $rootScope.$on('user.logout', function(event, data) {
                $scope.loggedInUser = undefined;
            });

            $scope.onSignupPress = function() {
                modalService.showSignUpModal();
            };

            function _recalculateHeight() {
                var carouselElement = angular.element(document.getElementById('carousel-container'));
                
                if (!carouselElement) {
                    return;
                }
                $scope.videoContainerHeight = carouselElement.innerHeight();
                $timeout(function() {
                    $scope.$apply();
                });
            }

            function _recalculateWidth() {
                $scope.showMobileCarousel = ($window.innerWidth < 768);
                _recalculateHeight();
            }


            categoryService.getAllCategories()
                .then(
                    function onSuccess(data) {
                        $scope.categories = data;
                        $scope.ready = true;
                    }
                );


            angular.element($window).on('resize.doResize', function () {
                _recalculateWidth();
            });
            _recalculateWidth();
        }
    ];

    angular
        .module('clixtv')
        .controller('HomeController', HomeController);
}());