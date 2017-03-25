(function() {

    var RightNavigationController = [
        '$scope',
        '$rootScope',
        '$timeout',
        'userService',
        function($scope, $rootScope, $timeout, userService) {

            $scope.open = true;
            $scope.visible = true;

            $rootScope.$on('rightnav.open', _openNavigation);

            $scope.onBackgroundPress = _closeNavigation;
            $scope.onClosePress = _closeNavigation;

            $scope.onLogoutPress = function() {
                userService.logout()
                    .then(
                        function onSuccess(data) {
                            _closeNavigation();
                        }
                    );
            };

            function _closeNavigation() {
                $scope.visible = false;
                $timeout(function() {
                    $scope.open = false;
                }, 500);
            }

            function _openNavigation() {
                $scope.open = true;
                $scope.visible = true;
            }

        }
    ];

    angular
        .module('clixtv')
        .controller('RightNavigationController', RightNavigationController);
}());