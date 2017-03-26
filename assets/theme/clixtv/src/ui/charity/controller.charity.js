(function() {

    var CharityController = [
        '$q',
        '$scope',
        '$stateParams',
        'brandsService',
        function($q, $scope, $stateParams, brandsService) {

            brandsService.getCharityById($stateParams.id)
                .then(
                    function onSuccess(data) {
                        console.log(data);
                        $scope.configs = {
                            title: data.title,
                            backgroundImage: '/assets/theme/clixtv/dist/images/nike-header.jpg',
                            backgroundImage2x: '/assets/theme/clixtv/dist/images/nike-header@2x.jpg',
                            logo: data.BrandTransparentLogo.url
                        }
                    }
                )

        }
    ];

    angular
        .module('clixtv')
        .controller('CharityController', CharityController);
}());