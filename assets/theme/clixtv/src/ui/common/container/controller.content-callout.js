(function() {

    var ContentCalloutController = [
        '$q',
        '$log',
        '$scope',
        '$rootScope',
        '$uibModal',
        'shareModalService',
        'userService',
        function($q, $log, $scope, $rootScope, $uibModal, shareModalService, userService) {

            var isUpdating = false;

            $scope.menuVisible = false;

            $scope.menuClicked = function($event) {
                $event.stopPropagation();
                $scope.menuVisible = !$scope.menuVisible;
            };

            $scope.bodyClicked = function(event) {
                if (angular.element(event.target).hasClass('menu-item')) {
                    return;
                }
                $scope.menuVisible = false;
            };

            $scope.onSharePress = function(type, item) {
                shareModalService.launchShareModal(type, item);
            };

            $scope.onFavoritePress = function(type, item) {
                var serviceMethod,
                    isFavorited = $scope.isFavoriteContent(type, item);

                if (isUpdating) {
                    $log.warn('Content is currently being updated from previous favorite, ignoring action');
                    return;
                }

                isUpdating = true;

                switch(type) {
                    case 'brand':
                        serviceMethod = (isFavorited) ? 'removeFavoriteBrand' : 'addFavoriteBrand';
                        break;
                    case 'category':
                        serviceMethod = (isFavorited) ? 'removeFavoriteCategory' : 'addFavoriteCategory';
                        break;
                    case 'celebrity':
                        serviceMethod = (isFavorited) ? 'removeFavoriteCelebrity' : 'addFavoriteCelebrity';
                        break;
                    case 'charity':
                        serviceMethod = (isFavorited) ? 'removeFavoriteCharity' : 'addFavoriteCharity';
                        break;
                }
                if (!serviceMethod) {
                    return;
                }
                userService[serviceMethod](item.id);
            };

            $scope.isFavoriteContent = function(type, item) {
                switch(type) {
                    case 'brand':
                        return userService.isFavoriteBrand(item.id);
                    case 'category':
                        return userService.isFavoriteCategory(item.id);
                    case 'celebrity':
                        return userService.isFavoriteCelebrity(item.id);
                    case 'charity':
                        return userService.isFavoriteCharity(item.id);
                }
                return false;
            };

            $rootScope.$on('favorite.added', function(event, data) {
                $scope.loggedInUser = data.user;
                isUpdating = false;
            });

            $rootScope.$on('favorite.removed', function(event, data) {
                $scope.loggedInUser = data.user;
                isUpdating = false;
            });

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
                isUpdating = false;
            });
        }
    ];

    angular
        .module('clixtv')
        .controller('ContentCalloutController', ContentCalloutController);
}());