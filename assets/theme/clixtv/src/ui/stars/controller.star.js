(function() {

    var StarController = [
        '$q',
        '$scope',
        '$rootScope',
        '$stateParams',
        'celebrityService',
        'userService',
        function($q, $scope, $rootScope, $stateParams, celebrityService, userService) {

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

            celebrityService.getCelebrityById($stateParams.id)
                .then(
                    function onSuccess(data) {

                        $scope.celebrity = data;
                        $scope.seriesList = data.series.series.map(function(series) {
                            return {
                                label: series.title,
                                seasons: series.seasons,
                                onClick: function(option) {
                                    $scope.selectedSeries = option;
                                }
                            }
                        });

                        $scope.selectedSeries = $scope.seriesList[0];


                        return;

                        $scope.configs = {
                            title: data.title,
                            description: data.description,
                            backgroundImage: data.BackgroundImage.url,
                            logo: data.BrandLogo.url
                        };
                        return $q.all(
                            [
                                celebrityService.getVideosByCelebrityId(data._id),
                                celebrityService.getBrandsByCelebrityId(data._id),
                                celebrityService.getCharitiesByCelebrityId(data._id),
                                celebrityService.getOffersByCelebrityId(data._id)
                            ]
                        )
                    }
                )
                .then(
                    function onSuccess(data) {
                        // $scope.relatedVideos = data[0];
                        // $scope.videos = data[0];
                        // $scope.brands = data[1];
                        // $scope.charities = data[2];
                        // $scope.offers = data[3];
                    }
                );
        }
    ];



    angular
        .module('clixtv')
        .controller('StarController', StarController);
}());