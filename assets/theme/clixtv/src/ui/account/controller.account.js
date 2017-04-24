(function() {

    var AccountController = [
        '$q',
        '$scope',
        '$rootScope',
        '$stateParams',
        'userService',
        function($q, $scope, $rootScope, $stateParams, userService) {

            var loggedInUserChecked = false;

            $scope.activeItem = $stateParams.section;

            $scope.onNavigationItemSelect = function(item) {
                $scope.activeItem = item;
            };

            function _setLoggedInUser(user) {
                if (!user && loggedInUserChecked) {
                    // 404
                    return;
                }
                loggedInUserChecked = true;
                $scope.loggedInUser = user;
                if (user) {
                    $scope.ready = true;
                }
            }

            $rootScope.$on('user.login', function(event, data) {
                _setLoggedInUser(data);
            });

            userService.getLoggedInUser()
                .then(
                    function onSuccess(data) {
                        _setLoggedInUser(data);
                    }
                );

        }
    ];

    angular
        .module('clixtv')
        .controller('AccountController', AccountController);
}());