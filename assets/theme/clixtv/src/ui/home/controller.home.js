(function() {

    var HomeController = [
        '$q',
        '$scope',
        '$timeout',
        '$window',
        'categoryService',
        'brandsService',
        function($q, $scope, $timeout, $window, categoryService, brandsService) {

            $scope.showMobileCarousel = false;

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