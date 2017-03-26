(function() {

    var StarController = [
        '$q',
        '$scope',
        '$stateParams',
        'celebrityService',
        function($q, $scope, $stateParams, celebrityService) {

            celebrityService.getCelebrityById($stateParams.id)
                .then(
                    function onSuccess(data) {
                        console.log(data);
                        $scope.configs = {
                            title: data.title,
                            description: data.description,
                            backgroundImage: data.BackgroundImage.url,
                            logo: data.BrandLogo.url
                        };
                    }
                )
        }
    ];



    angular
        .module('clixtv')
        .controller('StarController', StarController);
}());