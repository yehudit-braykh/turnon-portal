(function() {

    var HomePageBannerController = [
        '$scope',
        '$rootScope',
        'modalService',
        function($scope, $rootScope, modalService) {

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
            });

            $rootScope.$on('user.logout', function(event, data) {
                $scope.loggedInUser = undefined;
            });

            $scope.onSignupPress = function() {
                modalService.showSignUpModal();
            };

        }
    ];

    angular
        .module('clixtv')
        .controller('HomePageBannerController', HomePageBannerController);
}());