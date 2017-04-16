(function() {

    var EducationModalController = [
        '$q',
        '$scope',
        '$rootScope',
        '$timeout',
        '$uibModalInstance',
        'itemData',
        'userService',
        'videosService',
        'brandsService',
        'celebrityService',
        'categoryService',
        'offersService',
        'modalService',
        'preferencesService',
        function($q, $scope, $rootScope, $timeout, $uibModalInstance, itemData, userService, videosService, brandsService, celebrityService, categoryService, offersService, modalService, preferencesService) {

            $scope.showAgainModel = false;

            function _getModalTitle() {
                var title,
                    isLoggedIn = ($scope.loggedInUser !== undefined);
                switch(itemData.type) {

                    case 'watchlist':
                        title = (isLoggedIn) ? 'Success!' : 'Saving to Watchlist';
                        break;

                    case 'brand':
                    case 'celebrity':
                    case 'category':
                    case 'charity':
                        title = (isLoggedIn) ? 'Success!' : 'Saving to Favorites';
                        break;

                    case 'offer':
                        title = (isLoggedIn) ? 'Reward Points Earned' : 'Reward Points Missed!';
                        break;
                }

                return title;
            }

            function _getItem() {
                var id = itemData.id;
                switch(itemData.type) {

                    case 'watchlist':
                        return videosService.getVideoById(id);

                    case 'brand':
                        return brandsService.getBrandById(id);

                    case 'celebrity':
                        return celebrityService.getCelebrityById(id);

                    case 'category':
                        return categoryService.getCategoryById(id);

                    case 'charity':
                        return brandsService.getCharityById(id);

                    case 'offer':
                        return offersService.getOfferById(id);
                }

                throw new Error('Error looking up item for type ' + itemData.type);
            }

            $scope.loggedInUser = itemData.loggedInUser;
            $scope.title = _getModalTitle();
            $scope.type = itemData.type;

            $scope.onCloseButtonPress = function() {
                $uibModalInstance.close();
            };

            $scope.onSignUpPress = function() {
                $uibModalInstance.close();
                $timeout(function() {
                    modalService.showSignUpModal();
                }, 100);
            };

            $scope.onLoginPress = function() {
                $uibModalInstance.close();
                $timeout(function() {
                    modalService.showLogInModal();
                }, 100);
            };

            $scope.onShowAgainChange = function(model) {
                preferencesService.setShowEducationModalPreference(itemData.type, model);
            };

            $q.all(
                    [
                        _getItem()
                    ]
                )
                .then(
                    function onSuccess(data) {
                        $scope.item = data[0];
                        $scope.ready = true;
                    }
                );
        }
    ];

    angular
        .module('clixtv')
        .controller('EducationModalController', EducationModalController);
}());