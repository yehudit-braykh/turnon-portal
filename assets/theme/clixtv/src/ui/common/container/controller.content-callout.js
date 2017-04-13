(function() {

    var ContentCalloutController = [
        '$q',
        '$scope',
        '$rootScope',
        '$uibModal',
        'shareModalService',
        'userService',
        function($q, $scope, $rootScope, $uibModal, shareModalService, userService) {

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
                switch(type) {
                    case 'brand':
                        userService.addFavoriteBrand(item.id);
                        break;
                    case 'category':
                        userService.addFavoriteCategory(item.id);
                        break;
                    case 'offer':
                        // userService.addFavoriteOffer(item.id);
                        break;
                    case 'celebrity':
                        userService.addFavoriteCelebrity(item.id);
                        break;
                    case 'charity':
                        userService.addFavoriteCharity(item.id);
                        break;
                }
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('ContentCalloutController', ContentCalloutController);
}());