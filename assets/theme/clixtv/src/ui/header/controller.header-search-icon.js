(function() {

    var HeaderSearchIconController = [
        '$scope',
        function($scope) {

            $scope.searchBarVisible = false;

            $scope.searchIconClicked = function($event) {
                $event.preventDefault();
                $scope.searchBarVisible = !$scope.searchBarVisible;
            }
        }
    ];

    angular
        .module('clixtv')
        .controller('HeaderSearchIconController', HeaderSearchIconController);
}());