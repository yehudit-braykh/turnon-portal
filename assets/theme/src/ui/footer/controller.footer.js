(function() {

    var FooterController = [
        '$scope',
        'turnonConfig',
        function($scope, turnonConfig) {
            $scope.isBeta = (turnonConfig.beta === true);
        }
    ];

    angular
        .module('turnon')
        .controller('FooterController', FooterController);
}());