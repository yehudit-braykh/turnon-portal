(function() {

    var AccountController = [
        '$q',
        '$scope',
        '$stateParams',
        function($q, $scope, $stateParams) {

            $scope.activeItem = $stateParams.section;

            $scope.onNavigationItemSelect = function(item) {
                $scope.activeItem = item;
            }
        }
    ];

    angular
        .module('clixtv')
        .controller('AccountController', AccountController);
}());