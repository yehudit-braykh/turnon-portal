(function() {

    var CharityController = [
        '$q',
        '$scope',
        '$rootScope',
        '$uibModal',
        '$stateParams',
        'brandsService',
        'userService',
        function($q, $scope, $rootScope, $uibModal, $stateParams, brandsService, userService) {

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

            brandsService.getCharityById($stateParams.id)
                .then(
                    function onSuccess(data) {
                        $scope.video = data;
                        $scope.configs = {
                            title: data.title,
                            description: data.description,
                            backgroundImage: '/assets/theme/clixtv/dist/images/special-olympics-header.jpg',
                            backgroundImage2x: '/assets/theme/clixtv/dist/images/special-olympics-header@2x.jpg',
                            backgroundImage3x: '/assets/theme/clixtv/dist/images/special-olympics-header@3x.jpg',
                            logo: data.BrandTransparentLogo.url
                        };

                        return $q.all(
                            [
                                brandsService.getCelebritiesByBrandId(data._id),
                                brandsService.getVideosByBrandId(data._id)
                            ]
                        )
                    }
                )
                .then(
                    function onSuccess(data) {
                        console.log(data);
                        $scope.celebrities = data[0];
                        $scope.videos = data[1];
                        $scope.relatedVideos = data[1];
                    }
                );

            $scope.onDonatePress = function() {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'ui/common/modal/donate/view.donate.html',
                    controller: 'DonateController',
                    windowClass: 'clix-modal-window',
                    size: 'clix-lg'
                });

                modalInstance.opened.then(
                    function onSuccess() {
                        $rootScope.$broadcast('modal.open');
                    }
                );

                modalInstance.closed.then(
                    function onSuccess() {
                        $rootScope.$broadcast('modal.close');
                    }
                );

                modalInstance.result.then(
                    function onSuccess(data) {

                    },
                    function onError(error) {

                    }
                )
            }

        }
    ];

    angular
        .module('clixtv')
        .controller('CharityController', CharityController);
}());