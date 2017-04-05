(function() {

    var OfferController = [
        '$q',
        '$scope',
        '$rootScope',
        '$stateParams',
        'offersService',
        'brandsService',
        'userService',
        function($q, $scope, $rootScope, $stateParams, offersService, brandsService, userService) {

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
            });

            $rootScope.$on('user.logout', function(event, data) {
                delete $scope.loggedInUser;
            });

            userService.getLoggedInUser()
                .then(
                    function onSuccess(data) {
                        $scope.loggedInUser = data;
                    }
                );

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

            $scope.offerMenuItems = [
                {
                    label: 'Save Offer',
                    icon: 'icon-redeem-plus-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Share',
                    icon: 'icon-share-icon',
                    points: '50',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Add to Favorites',
                    icon: 'icon-favorite-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                }
            ];

            offersService.getOfferById($stateParams.id)
                .then(
                    function onSuccess(data) {

                        console.log(data);

                        $scope.offer = data;

                        $scope.configs = {
                            title: data.title,
                            description: data.description,
                            backgroundImage: data.headerImage,
                            logo: data.brand.transparentThumbnail
                        };

                        return;

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
                        // $scope.offers = data[0];
                        // $scope.brand = data[1];
                        // $scope.videos = data[2];
                    }
                );
        }
    ];



    angular
        .module('clixtv')
        .controller('OfferController', OfferController);
}());