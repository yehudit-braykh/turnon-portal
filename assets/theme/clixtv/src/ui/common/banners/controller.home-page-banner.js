(function() {

    var HomePageBannerController = [
        '$scope',
        '$rootScope',
        function($scope, $rootScope) {

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
            });

            $rootScope.$on('user.logout', function(event, data) {
                $scope.loggedInUser = undefined;
            });

        }
    ];

    angular
        .module('clixtv')
        .controller('HomePageBannerController', HomePageBannerController);
}());