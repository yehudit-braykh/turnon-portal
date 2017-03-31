(function() {

    var HomeController = [
        '$q',
        '$scope',
        '$rootScope',
        '$timeout',
        '$window',
        '$uibModal',
        'categoryService',
        'brandsService',
        function($q, $scope, $rootScope, $timeout, $window, $uibModal, categoryService, brandsService) {

            $scope.showMobileCarousel = false;

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
            });

            $rootScope.$on('user.logout', function(event, data) {
                $scope.loggedInUser = undefined;
            });

            $scope.onSignupPress = function() {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'ui/common/modal/login-signup/view.login-signup.html',
                    controller: 'LoginSignupController',
                    windowClass: 'clix-modal-window',
                    size: 'clix-md',
                    resolve: {
                        signup: true
                    }
                });

                modalInstance.result.then(
                    function onSuccess(data) {

                    },
                    function onError(error) {

                    }
                )
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
                $scope.showMobileCarousel = ($window.innerWidth <= 768);
                _recalculateHeight();
            }

            function _loadVideosForCategoryIndex(index) {
                var category = $scope.categories[index];
                if (!category) {
                    return;
                }

                categoryService.getCategoryVideosByName(category.title)
                    .then(
                        function onSuccess(data) {
                            var videos = data;

                            // Assign the brands for each video
                            videos.forEach(function(video) {
                                video.brands = (video.brands || []).map(function(brand) {
                                    return $scope.brands[brand];
                                });
                            });

                            $scope.categories[index].videos = videos;
                        }
                    );

                _loadVideosForCategoryIndex(index + 1);
            }

            $q.all(
                    [
                        categoryService.getAllCategories(),
                        brandsService.getAllBrandsAndCharities()
                    ]
                )
                .then(
                    function onSuccess(data) {
                        $scope.categories = data[0];
                        $scope.brands = data[1];
                        _loadVideosForCategoryIndex(0);
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