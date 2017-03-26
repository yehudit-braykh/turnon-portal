(function() {

    var OfferController = [
        '$q',
        '$scope',
        '$stateParams',
        'offersService',
        'brandsService',
        function($q, $scope, $stateParams, offersService, brandsService) {

            $scope.seriesList = [
                {
                    label: 'Most Viewed'
                },
                {
                    label: 'Most Viewed'
                },
                {
                    label: 'Most Viewed'
                }
            ];


            offersService.getOfferById($stateParams.id)
                .then(
                    function onSuccess(data) {

                        var brandId = '5804d1e7a7889d000337f0e2',
                            brandSlug = 'nike';

                        $scope.configs = {
                            title: data.title,
                            description: data.description,
                            backgroundImage: data.BackgroundImage.url,
                            logo: data.BrandTransparentLogo.url
                        };
                        return $q.all(
                            [
                                brandsService.getOffersByBrandId(brandId),
                                brandsService.getBrandBySlug(brandSlug),
                                brandsService.getVideosByBrandId(brandId)
                            ]
                        );
                    }
                )
                .then(
                    function onSuccess(data) {
                        $scope.offers = data[0];
                        $scope.brand = data[1];
                        $scope.videos = data[2];
                    }
                );
        }
    ];



    angular
        .module('clixtv')
        .controller('OfferController', OfferController);
}());