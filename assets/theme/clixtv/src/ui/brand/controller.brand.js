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
        'clixConfig',
        function($q, $log, $scope, $rootScope, $state, $stateParams, brandsService, userService, modalService, catchMediaService, knetikService, clixConfig) {

            $scope.filtersEnabled = clixConfig.filtersEnabled;

            $scope.onOfferPress = function(offer) {
                if ($stateParams.offerId === offer.id) {
                    _showOfferModal();
                }
            };

            function _showOfferModal() {
                if ($scope.loggedInUser) {
                    modalService.showModal({
                        controller: 'OfferModalController',
                        templateUrl: 'ui/common/modal/offer/view.offer-modal.html',
                        data: {
                            offerId: $stateParams.offerId
                        }
                    });
                } else {
                    modalService.showModal({
                        templateUrl: 'ui/common/modal/education/view.education-modal.html',
                        controller: 'EducationModalController',
                        data: {
                            type: 'signup-offer',
                            id: $stateParams.offerId
                        }
                    });
                }
            }

            function _resetIsFavorite() {
                $scope.isFavorite = userService.isFavoriteBrand($stateParams.id);
            }

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
                _resetIsFavorite();
            });

            $rootScope.$on('user.logout', function(event, data) {
                $scope.loggedInUser = undefined;
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
                        if ($stateParams.offerId) {
                            _showOfferModal();
                        }
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

                switch(tab) {

                    case 'offers':
                        catchMediaService.trackAppEvent('navigation', {
                            target_cm: 'media',
                            target_type: 'offer',
                            source_cm: 'media',
                            source_type: 'campaign',
                            source_id: $stateParams.id
                        });
                        break;

                    case 'stars':
                        catchMediaService.trackAppEvent('navigation', {
                            target_cm: 'media',
                            target_type: 'person',
                            source_cm: 'media',
                            source_type: 'campaign',
                            source_id: $stateParams.id
                        });
                        break;

                    case 'videos':
                        catchMediaService.trackAppEvent('navigation', {
                            target_cm: 'media',
                            target_type: 'episode',
                            source_cm: 'media',
                            source_type: 'campaign',
                            source_id: $stateParams.id
                        });
                        break;
                }
            };

            brandsService.getBrandById($stateParams.id)
                .then(
                    function onSuccess(data) {

                        $scope.brand = data;
                        $scope.active = 0;

                        // Don't overwrite the title if we're showing an offer
                        if (!$stateParams.offerId) {
                            $rootScope.pageTitle = $scope.brand.title + ' - ClixTV';
                        }

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

                        catchMediaService.trackAppEvent('navigation_item', {
                            target_cm: 'media',
                            target_type: 'campaign',
                            target_id: $stateParams.id
                        });
                    }
                )
                .catch(
                    function onError(error) {
                        $log.error(error);
                        $state.go('404');
                    }
                );
        }
    ];

    angular
        .module('clixtv')
        .controller('BrandController', BrandController);
}());