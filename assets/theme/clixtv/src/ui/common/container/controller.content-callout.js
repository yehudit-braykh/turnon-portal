(function() {

    var ContentCalloutController = [
        '$q',
        '$scope',
        '$rootScope',
        '$uibModal',
        'shareModalService',
        function($q, $scope, $rootScope, $uibModal, shareModalService) {

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
            }
        }
    ];

    angular
        .module('clixtv')
        .controller('ContentCalloutController', ContentCalloutController);
}());