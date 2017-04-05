(function() {

    var BrandController = [
        '$q',
        '$scope',
        '$rootScope',
        '$stateParams',
        'brandsService',
        'userService',
        'catchMediaService',
        function($q, $scope, $rootScope, $stateParams, brandsService, userService, catchMediaService) {

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
                    label: 'A - Z'
                },
                {
                    label: 'Most Viewed'
                },
                {
                    label: 'Favorites'
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

            brandsService.getBrandById($stateParams.id)
                .then(
                    function onSuccess(data) {

                        $scope.video = {
                            streamUrl: data.trailer,
                            thumbnail: data.trailerThumbnail
                        };
                        $scope.configs = {
                            title: data.title,
                            description: data.description,
                            backgroundImage: data.headerImage,
                            backgroundImage2x: data.headerImage,
                            backgroundImage3x: data.headerImage,
                            logo: data.logo
                        };


                        // console.log(data);
                    }
                );


            // brandsService.getBrandBySlug($stateParams.slug)
            //     .then(
            //         function onSuccess(data) {
            //             $scope.video = data;
            //             $scope.configs = {
            //                 title: data.title,
            //                 description: data.description,
            //                 backgroundImage: '/assets/theme/clixtv/dist/images/nike-header.jpg',
            //                 backgroundImage2x: '/assets/theme/clixtv/dist/images/nike-header@2x.jpg',
            //                 backgroundImage3x: '/assets/theme/clixtv/dist/images/nike-header@3x.jpg',
            //                 logo: data.BrandTransparentLogo.url
            //             };
            //             return $q.all(
            //                 [
            //                     brandsService.getOffersByBrandId(data._id),
            //                     brandsService.getVideosByBrandId(data._id),
            //                     brandsService.getCelebritiesByBrandId(data._id)
            //                 ]
            //             )
            //         }
            //     )
            //     .then(
            //         function onSuccess(data) {
            //             $scope.offers = data[0];
            //             $scope.relatedVideos = data[1];
            //             $scope.videos = data[1];
            //             $scope.celebrities = data[2];
            //         }
            //     );

        }
    ];

    angular
        .module('clixtv')
        .controller('BrandController', BrandController);
}());