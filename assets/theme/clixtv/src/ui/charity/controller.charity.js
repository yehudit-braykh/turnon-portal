(function() {

    var CharityController = [
        '$q',
        '$scope',
        '$uibModal',
        '$stateParams',
        'brandsService',
        function($q, $scope, $uibModal, $stateParams, brandsService) {

            brandsService.getCharityById($stateParams.id)
                .then(
                    function onSuccess(data) {
                        $scope.video = data;
                        $scope.configs = {
                            title: data.title,
                            description: data.description,
                            backgroundImage: '/assets/theme/clixtv/dist/images/nike-header.jpg',
                            backgroundImage2x: '/assets/theme/clixtv/dist/images/nike-header@2x.jpg',
                            logo: data.BrandTransparentLogo.url
                        };

                        return $q.all(
                            [
                                brandsService.getCelebritiesByBrandId(data._id),
                                brandsService.getVideosByBrandId(data._id)
                            ]
                        )
                    }
                )
                .then(
                    function onSuccess(data) {
                        console.log(data);
                        $scope.celebrities = data[0];
                        $scope.videos = data[1];
                        $scope.relatedVideos = data[1];
                    }
                );

            $scope.onDonatePress = function() {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'ui/common/modal/donate/view.donate.html',
                    controller: 'DonateController',
                    windowClass: 'clix-modal-window',
                    size: 'clix-lg'
                });

                modalInstance.result.then(
                    function onSuccess(data) {

                    },
                    function onError(error) {

                    }
                )
            }

        }
    ];

    angular
        .module('clixtv')
        .controller('CharityController', CharityController);
}());