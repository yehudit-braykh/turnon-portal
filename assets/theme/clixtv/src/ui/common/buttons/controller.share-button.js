(function() {

    var ShareButtonController = [
        '$q',
        '$scope',
        '$rootScope',
        '$uibModal',
        function($q, $scope, $rootScope, $uibModal) {

            $scope.onShareIconPress = function() {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'ui/common/modal/share/view.share.html',
                    controller: 'ShareController',
                    windowClass: 'clix-modal-window',
                    size: 'clix-lg',
                    resolve: {
                        shareModalVideo: $scope.video,
                        shareModalOffer: $scope.offer,
                        shareModalCelebrity: $scope.celebrity,
                        shareModalBrand: $scope.brand,
                        shareModalCharity: $scope.charity,
                        shareModalCategory: $scope.category
                    }
                });

                modalInstance.opened.then(
                    function onSuccess() {
                        $rootScope.$broadcast('modal.open');
                    }
                );

                modalInstance.closed.then(
                    function onSuccess() {
                        $rootScope.$broadcast('modal.close');
                    }
                );

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