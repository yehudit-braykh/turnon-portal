(function() {

    var OfferLogoController = [
        '$q',
        '$scope',
        'clixConfig',
        function($q, $scope, clixConfig) {

            $scope.menuVisible = false;
            $scope.pointsEnabled = clixConfig.pointsEnabled;

            $scope.items = [
                {
                    label: 'Save Offer',
                    icon: 'icon-redeem-plus-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Share',
                    icon: 'icon-share-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                },
                {
                    label: 'Add to Favorites',
                    icon: 'icon-favorite-icon',
                    onClick: function() {
                        console.log('SHARE');
                    }
                }
            ];

            $scope.menuClicked = function($event) {
                $event.stopPropagation();
                $scope.menuVisible = !$scope.menuVisible;
            };

            $scope.bodyClicked = function(event) {
                if (angular.element(event.target).hasClass('menu-item')) {
                    return;
                }
                $scope.menuVisible = false;
            };

            $scope.onImageLoad = function() {
                $scope.ready = true;
            };
        }
    ];

    angular
        .module('clixtv')
        .controller('OfferLogoController', OfferLogoController);
}());