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

            var moreToLoad = true;

            $rootScope.pageTitle = 'ClixTV - Your Stars. Their Passions.';

            $scope.PAGE_LIMIT = 3;
            $scope.currentPage = 0;

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

            $scope.onLoadMore = function($inview) {
                if (!$scope.ready || !$inview) {
                    return;
                }
                _loadCategories();
            };

            function _recalculateHeight() {
                var carouselElement = angular.element(document.getElementById('carousel-container'));
                
                if (!carouselElement) {
                    return;
                }
                $scope.videoContainerHeight = carouselElement.innerHeight();
                // $timeout(function() {
                //     $scope.$apply();
                // });
            }

            function _recalculateWidth() {
                $scope.showMobileCarousel = ($window.innerWidth < 768);
                _recalculateHeight();
            }

            function _loadCategories() {
                if ($scope.loading || !moreToLoad) {
                    return;
                }
                $scope.loading = true;
                categoryService.getAllCategories(false, $scope.currentPage, $scope.PAGE_LIMIT)
                    .then(
                        function onSuccess(data) {
                            if ($scope.categories) {
                                $scope.categories.categories = $scope.categories.categories.concat(data.categories);
                            } else {
                                $scope.categories = data;
                            }
                            if (!data || data.categories.length === 0) {
                                moreToLoad = false;
                            }
                            $scope.ready = true;
                            $scope.currentPage += 1;
                            $timeout(function() {
                                angular.element(window).trigger('resize.doResize');
                                $scope.loading = false;
                            });
                        }
                    );
            }


            angular.element($window).on('resize.doResize', function () {
                _recalculateWidth();
            });
            _loadCategories();
        }
    ];

    angular
        .module('clixtv')
        .controller('HomeController', HomeController);
}());