(function() {

    var CharityController = [
        '$q',
        '$log',
        '$scope',
        '$rootScope',
        '$uibModal',
        '$state',
        '$stateParams',
        'brandsService',
        'userService',
        'catchMediaService',
        function($q, $log, $scope, $rootScope, $uibModal, $state, $stateParams, brandsService, userService, catchMediaService) {

            function _resetIsFavorite() {
                $scope.isFavorite = userService.isFavoriteCharity($stateParams.id);
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
                    userService.removeFavoriteCharity($stateParams.id);
                } else {
                    userService.addFavoriteCharity($stateParams.id);
                }
            };

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

                        if (!data || !data.id) {
                            throw new Error('Invalid data returned');
                        }

                        $scope.charity = data;
                        $scope.active = 0;

                        $scope.video = {
                            streamUrl: data.trailer,
                            thumbnail: data.trailerThumbnail
                        };
                    }
                )
                .catch(
                    function onError(error) {
                        $log.error(error);
                        $state.go('404');
                    }
                );

            catchMediaService.trackCharityPageEvent($stateParams.id);

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