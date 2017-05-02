(function() {

    var StarController = [
        '$q',
        '$log',
        '$scope',
        '$rootScope',
        '$state',
        '$stateParams',
        'celebrityService',
        'userService',
        'catchMediaService',
        function($q, $log, $scope, $rootScope, $state, $stateParams, celebrityService, userService, catchMediaService) {

            function _resetIsFavorite() {
                $scope.isFavorite = userService.isFavoriteCelebrity($stateParams.id);
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

            userService.getLoggedInUser()
                .then(
                    function onSuccess(data) {
                        $scope.loggedInUser = data;
                        _resetIsFavorite();
                    }
                );

            $scope.onFavoritePress = function() {
                if ($scope.isFavorite) {
                    userService.removeFavoriteCelebrity($stateParams.id);
                } else {
                    userService.addFavoriteCelebrity($stateParams.id);
                }
            };

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

            $scope.charityMenuItems = [
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

            $scope.brandMenuItems = [
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

            function _setEpisodeList() {

            }

            celebrityService.getCelebrityById($stateParams.id)
                .then(
                    function onSuccess(data) {

                        $scope.celebrity = data;
                        $scope.active = 0;

                        if (data.series && data.series.series) {
                            $scope.seriesList = data.series.series.map(function(series) {
                                return {
                                    label: series.title,
                                    series: series,
                                    onClick: function(option) {
                                        $scope.selectedSeries = option;
                                        _setEpisodeList();
                                    }
                                }
                            });

                            $scope.selectedSeries = $scope.seriesList[0];
                            _setEpisodeList();
                        }
                    }
                )
                .catch(
                    function onError(error) {
                        $log.error(error);
                        $state.go('404');
                    }
                );

            catchMediaService.trackCelebrityPageEvent($stateParams.id);

            switch($stateParams.tab) {
                case 'brands':
                    $scope.active = 1;
                    break;
                case 'charities':
                    $scope.active = 2;
                    break;
                default:
                    $scope.active = 0;
                    break;
            }
        }
    ];



    angular
        .module('clixtv')
        .controller('StarController', StarController);
}());