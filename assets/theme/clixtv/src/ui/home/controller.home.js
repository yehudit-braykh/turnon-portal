(function() {

    var HomeController = [
        '$q',
        '$scope',
        'categoryService',
        'brandsService',
        function($q, $scope, categoryService, brandsService) {

            function _loadVideosForCategoryIndex(index) {
                var category = $scope.categories[index];
                if (!category) {
                    return;
                }

                categoryService.getCategoryVideosByName(category.title)
                    .then(
                        function onSuccess(data) {
                            var videos = data.data;

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
                        brandsService.getAllBrands()
                    ]
                )
                .then(
                    function onSuccess(data) {
                        $scope.categories = data[0].data;
                        $scope.brands = data[1].data;
                        _loadVideosForCategoryIndex(0);
                    }
                );
        }
    ];

    angular
        .module('clixtv')
        .controller('HomeController', HomeController);
}());