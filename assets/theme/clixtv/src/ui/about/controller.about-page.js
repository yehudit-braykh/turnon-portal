(function() {

    var AboutPageController = [
        '$scope',
        '$rootScope',
        'userService',
        'modalService',
        function($scope, $rootScope, userService, modalService) {

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
            });

            $rootScope.$on('user.logout', function(event, data) {
                $scope.loggedInUser = undefined;
            });

            $scope.onSignUpPress = function() {
                modalService.showSignUpModal();
            };

            userService.getLoggedInUser()
                .then(
                    function onSuccess(data) {
                        $scope.loggedInUser = data;
                    }
                );

        }
    ];

    angular
        .module('clixtv')
        .controller('AboutPageController', AboutPageController);
}());