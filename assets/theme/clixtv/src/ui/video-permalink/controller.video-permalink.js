(function() {

    var VideoPermalinkController = [
        '$q',
        '$scope',
        'videosService',
        function($q, $scope, videosService) {


            videosService.getVideoById('57db028006531d030058084a')
                .then(
                    function onSuccess(data) {
                        $scope.video = data.data;
                        console.log(data.data);
                    }
                )

        }
    ];

    angular
        .module('clixtv')
        .controller('VideoPermalinkController', VideoPermalinkController);
}());