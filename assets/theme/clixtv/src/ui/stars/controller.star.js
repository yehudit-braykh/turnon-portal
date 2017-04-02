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

            $scope.seriesList = [
                {
                    label: 'Series 1'
                },
                {
                    label: 'Series 2'
                },
                {
                    label: 'Series 3'
                }
            ];

            celebrityService.getCelebrityById($stateParams.id)
                .then(
                    function onSuccess(data) {
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
                        $scope.relatedVideos = data[0];
                        $scope.videos = data[0];
                        $scope.brands = data[1];
                        $scope.charities = data[2];
                        $scope.offers = data[3];
                    }
                );
        }
    ];



    angular
        .module('clixtv')
        .controller('StarController', StarController);
}());