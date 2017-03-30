(function() {

    var AccountRewardsController = [
        '$q',
        '$scope',
        '$rootScope',
        'userService',
        function($q, $scope, $rootScope, userService) {

            $scope.ready = true;

        }
    ];

    angular
        .module('clixtv')
        .controller('AccountRewardsController', AccountRewardsController);
}());