(function() {

    var BrandController = [
        '$q',
        '$scope',
        '$stateParams',
        'brandsService',
        function($q, $scope, $stateParams, brandsService) {

            brandsService.getBrandBySlug($stateParams.slug)
                .then(
                    function onSuccess(data) {
                        $scope.video = data;
                        $scope.configs = {
                            title: data.title,
                            description: data.description,
                            backgroundImage: '/assets/theme/clixtv/dist/images/nike-header.jpg',
                            backgroundImage2x: '/assets/theme/clixtv/dist/images/nike-header@2x.jpg',
                            logo: data.BrandTransparentLogo.url
                        };
                        return $q.all(
                            [
                                brandsService.getOffersByBrandId(data._id),
                                brandsService.getVideosByBrandId(data._id)
                            ]
                        )
                    }
                )
                .then(
                    function onSuccess(data) {
                        $scope.offers = data[0];
                        $scope.relatedVideos = data[1];
                        $scope.videos = data[1];

                        console.log(data[1]);
                    }
                );

        }
    ];

    angular
        .module('clixtv')
        .controller('BrandController', BrandController);
}());