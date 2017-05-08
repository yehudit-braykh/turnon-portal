(function() {

    var BrandController = [
        '$q',
        '$log',
        '$scope',
        '$rootScope',
        '$state',
        '$stateParams',
        'brandsService',
        'userService',
        'modalService',
        'catchMediaService',
        'knetikService',
        function($q, $log, $scope, $rootScope, $state, $stateParams, brandsService, userService, modalService, catchMediaService, knetikService) {

            if ($stateParams.offerId) {
                modalService.showModal({
                    controller: 'OfferModalController',
                    templateUrl: 'ui/common/modal/offer/view.offer-modal.html',
                    data: {
                        offerId: $stateParams.offerId
                    }
                });
            }

            $scope.onOfferPress = function(offer) {
                modalService.showModal({
                    controller: 'OfferModalController',
                    templateUrl: 'ui/common/modal/offer/view.offer-modal.html',
                    data: {
                        offerId: $stateParams.offerId
                    }
                });
            };

            function _resetIsFavorite() {
                $scope.isFavorite = userService.isFavoriteBrand($stateParams.id);
            }

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
                _resetIsFavorite();
            });

            $rootScope.$on('user.logout', function(event, data) {
                delete $scope.loggedInUser;
                _resetIsFavorite();
            });

            $rootScope.$on('favorite.added', _resetIsFavorite);
            $rootScope.$on('favorite.removed', _resetIsFavorite);

            $rootScope.$on('video.complete', function() {
                knetikService.viewCampaignVideo($stateParams.id);
            });

            userService.getLoggedInUser()
                .then(
                    function onSuccess(data) {
                        $scope.loggedInUser = data;
                        _resetIsFavorite();
                    }
                );

            $scope.onFavoritePress = function() {
                if ($scope.isFavorite) {
                    userService.removeFavoriteBrand($stateParams.id);
                } else {
                    userService.addFavoriteBrand($stateParams.id);
                }
            };

            $scope.seriesList = [
                {
                    label: 'A - Z'
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

            $scope.onTabSelect = function(tab) {
                catchMediaService.trackBrandPageEvent($stateParams.id, tab);
            };

            brandsService.getBrandById($stateParams.id)
                .then(
                    function onSuccess(data) {

                        $scope.brand = data;
                        $scope.active = 0;

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
                    }
                )
                .catch(
                    function onError(error) {
                        $log.error(error);
                        $state.go('404');
                    }
                );

            catchMediaService.trackBrandPageEvent($stateParams.id);
        }
    ];

    angular
        .module('clixtv')
        .controller('BrandController', BrandController);
}());