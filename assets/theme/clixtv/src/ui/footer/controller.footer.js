(function() {

    var FooterController = [
        '$scope',
        'clixConfig',
        function($scope, clixConfig) {
            $scope.isBeta = (clixConfig.beta === true);
        }
    ];

    angular
        .module('clixtv')
        .controller('FooterController', FooterController);
}());