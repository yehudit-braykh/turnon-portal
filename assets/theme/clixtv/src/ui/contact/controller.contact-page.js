(function() {

    var ContactPageController = [
        '$scope',
        '$stateParams',
        function($scope, $stateParams) {
            console.log($stateParams.section);
        }
    ];

    angular
        .module('clixtv')
        .controller('ContactPageController', ContactPageController);
}());