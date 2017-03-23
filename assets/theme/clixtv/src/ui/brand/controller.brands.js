(function() {

    var BrandsController = [
        '$q',
        '$scope',
        '$stateParams',
        'brandsService',
        function($q, $scope, $stateParams, brandsService) {

            brandsService.getAllBrands()
                .then(
                    function onSuccess(data) {
                        $scope.brands = data;
                    }
                );

        }
    ];

    angular
        .module('clixtv')
        .controller('BrandsController', BrandsController);
}());