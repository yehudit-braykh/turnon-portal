(function() {

    var StarController = [
        '$q',
        '$scope',
        '$stateParams',
        'celebrityService',
        function($q, $scope, $stateParams, celebrityService) {

            $scope.seriesList = [
                {
                    label: 'Series 1'
                },
                {
                    label: 'Series 2'
                },
                {
                    label: 'Series 3'
                }
            ];

            celebrityService.getCelebrityById($stateParams.id)
                .then(
                    function onSuccess(data) {
                        $scope.configs = {
                            title: data.title,
                            description: data.description,
                            backgroundImage: data.BackgroundImage.url,
                            logo: data.BrandLogo.url
                        };
                        return $q.all(
                            [
                                celebrityService.getVideosByCelebrityId(data._id)
                            ]
                        )
                    }
                )
                .then(
                    function onSuccess(data) {
                        $scope.relatedVideos = data[0];
                        $scope.videos = data[0];
                    }
                );
        }
    ];



    angular
        .module('clixtv')
        .controller('StarController', StarController);
}());