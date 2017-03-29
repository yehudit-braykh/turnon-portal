(function() {

    var ShareButtonController = [
        '$q',
        '$scope',
        '$uibModal',
        function($q, $scope, $uibModal) {

            $scope.onShareIconPress = function() {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'ui/common/modal/share/view.share.html',
                    controller: 'ShareController',
                    windowClass: 'clix-modal-window',
                    size: 'clix-lg',
                    resolve: {
                        shareModalVideo: $scope.video,
                        shareModalOffer: $scope.offer
                    }
                });

                modalInstance.result.then(
                    function onSuccess(data) {

                    },
                    function onError(error) {

                    }
                )
            };

        }
    ];

    angular
        .module('clixtv')
        .controller('ShareButtonController', ShareButtonController);
}());