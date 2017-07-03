(function() {

    var EducationModalController = [
        '$q',
        '$scope',
        '$rootScope',
        '$timeout',
        '$uibModalInstance',
        'data',
        'userService',
        'videosService',
        'brandsService',
        'celebrityService',
        'categoryService',
        'offersService',
        'modalService',
        'preferencesService',
        'clixConfig',
        function($q, $scope, $rootScope, $timeout, $uibModalInstance, data, userService, videosService, brandsService, celebrityService, categoryService, offersService, modalService, preferencesService, clixConfig) {

            $scope.showAgainModel = false;
            $scope.pointsEnabled = clixConfig.pointsEnabled;

            var itemData = data;

            function _getModalTitle() {
                var title,
                    isLoggedIn = ($scope.loggedInUser !== undefined && $scope.loggedInUser);

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

                    case 'offer-view':
                    case 'offer':
                        if ($scope.pointsEnabled) {
                            title = (isLoggedIn) ? 'Reward Points Earned' : 'Reward Points Missed!';
                        } else {
                            title = 'Reward points coming soon';
                        }
                        break;

                    case 'learn-more':
                        title = (isLoggedIn) ? 'Earn Rewards!' : 'Earn Reward Points!';
                        break;

                    case 'anonymous-liked-video':
                    case 'signup-offer':
                        title = 'Sign Up Now';
                        break;

                    case 'notifications-coming-soon':
                        title = 'Notifications Coming Soon';
                        break;
                }

                return title;
            }

            function _getItem() {
                var id = itemData.id;
                if (!itemData.id) {
                    return $q.when();
                }
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

                    case 'offer-view':
                    case 'offer':
                        return offersService.getOfferById(id);

                    case 'anonymous-liked-video':
                    case 'signup-offer':
                        return $q.when();
                }

                throw new Error('Error looking up item for type ' + itemData.type);
            }

            $scope.loggedInUser = itemData.loggedInUser;
            $scope.title = _getModalTitle();
            $scope.type = itemData.type;

            $scope.onCloseButtonPress = function(navigation) {
                if (modalService.getNumberOfModalsInStack() >= 2 && !navigation) {
                    modalService.pop();
                } else {
                    $uibModalInstance.close({
                        navigation: navigation
                    });
                    modalService.close();
                }
            };

            $scope.onSignUpPress = function() {
                if (modalService.getNumberOfModalsInStack() >= 2) {
                    modalService.showSignUpModal();
                } else {
                    $uibModalInstance.close();
                    $timeout(function() {
                        modalService.showSignUpModal();
                    }, 100);
                }
            };

            $scope.onLoginPress = function() {
                if (modalService.getNumberOfModalsInStack() >= 2) {
                    modalService.showLogInModal();
                } else {
                    $uibModalInstance.close();
                    $timeout(function() {
                        modalService.showLogInModal();
                    }, 100);
                }
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