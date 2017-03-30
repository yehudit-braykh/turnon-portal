(function() {

    var PageFilterController = [
        '$q',
        '$scope',
        '$transclude',
        function($q, $scope, $transclude) {

            $scope.pageTitleProvided = $transclude.isSlotFilled('pageTitle');

        }
    ];

    angular
        .module('clixtv')
        .controller('PageFilterController', PageFilterController);
}());