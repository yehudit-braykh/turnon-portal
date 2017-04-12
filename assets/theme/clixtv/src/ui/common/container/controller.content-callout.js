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
                
                console.log('FAVORITE', type, item);
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('ContentCalloutController', ContentCalloutController);
}());