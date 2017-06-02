(function() {

    var BrandController = [
        '$q',
        '$log',
        '$scope',
        '$rootScope',
        '$filter',
        '$state',
        '$stateParams',
        'brandsService',
        'userService',
        'modalService',
        'catchMediaService',
        'knetikService',
        'clixConfig',
        function($q, $log, $scope, $rootScope, $filter, $state, $stateParams, brandsService, userService, modalService, catchMediaService, knetikService, clixConfig) {

            $scope.filtersEnabled = clixConfig.filtersEnabled;

            $scope.onOfferPress = function(offer) {
                if ($stateParams.offerSlug === $filter('slug')(offer.title)) {
                    _showOfferModal();
                }
            };

            function _showOfferModal() {
                if ($scope.loggedInUser) {
                    modalService.showModal({
                        controller: 'OfferModalController',
                        templateUrl: 'ui/common/modal/offer/view.offer-modal.html',
                        data: {
                            offerSlug: $stateParams.offerSlug
                        }
                    });
                } else {
                    modalService.showModal({
                        templateUrl: 'ui/common/modal/education/view.education-modal.html',
                        controller: 'EducationModalController',
                        data: {
                            type: 'signup-offer',
                            slug: $stateParams.offerSlug
                        }
                    });
                }
            }

            function _resetIsFavorite() {
                if ($scope.brand) {
                    $scope.isFavorite = userService.isFavoriteBrand($scope.brand.id);
                }
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
                knetikService.viewCampaignVideo($scope.brand.id);
            });

            userService.getLoggedInUser()
                .then(
                    function onSuccess(data) {
                        $scope.loggedInUser = data;
                        _resetIsFavorite();
                        if ($stateParams.offerSlug) {
                            _showOfferModal();
                        }
                    }
                );

            $scope.onFavoritePress = function() {
                if ($scope.isFavorite) {
                    userService.removeFavoriteBrand($scope.brand.id);
                } else {
                    userService.addFavoriteBrand($scope.brand.id);
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
                            source_id: $scope.brand.id
                        });
                        break;

                    case 'stars':
                        catchMediaService.trackAppEvent('navigation', {
                            target_cm: 'media',
                            target_type: 'person',
                            source_cm: 'media',
                            source_type: 'campaign',
                            source_id: $scope.brand.id
                        });
                        break;

                    case 'videos':
                        catchMediaService.trackAppEvent('navigation', {
                            target_cm: 'media',
                            target_type: 'episode',
                            source_cm: 'media',
                            source_type: 'campaign',
                            source_id: $scope.brand.id
                        });
                        break;
                }
            };

            brandsService.getBrandBySlug($stateParams.slug)
                .then(
                    function onSuccess(data) {

                        $scope.brand = data;
                        $scope.active = 0;

                        // Don't overwrite the title if we're showing an offer
                        if (!$stateParams.offerSlug) {
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
                            target_id: $scope.brand.id
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