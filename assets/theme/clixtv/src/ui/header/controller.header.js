(function() {

    var HeaderController = [
        '$q',
        '$scope',
        '$rootScope',
        '$window',
        '$timeout',
        '$uibModal',
        'notificationsService',
        'knetikService',
        'modalService',
        'catchMediaService',
        'clixConfig',
        function($q, $scope, $rootScope, $window, $timeout, $uibModal, notificationsService, knetikService, modalService, catchMediaService, clixConfig) {

            var latestOffset = 0;

            $scope.isBeta = (clixConfig.beta === true);

            function _populateHeaderData() {
                $q.all(
                        [
                            notificationsService.getNotifications(),
                            knetikService.getPoints()
                        ]
                    )
                    .then(
                        function onSuccess(data) {
                            $scope.notifications = data[0];
                            $scope.points = isNaN(data[1]) ? 0 : data[1];
                        }
                    );
            }

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
                _populateHeaderData();
            });

            $rootScope.$on('user.update', function(event, data) {
                $scope.loggedInUser = data;
            });

            $rootScope.$on('user.logout', function(event, data) {
                delete $scope.loggedInUser;
            });

            $scope.onArrowPress = function() {
                $rootScope.$broadcast('rightnav.open');
            };

            $scope.onNamePress = function() {
                if ($scope.notifications.notifications.length === 0) {
                    return;
                }
                $scope.tooltipsShown = !$scope.tooltipsShown;
            };

            $scope.hideNotificationMenu = function(event) {
                $scope.tooltipsShown = false;
            };

            $scope.onLoginSignupPress = function(signup) {
                if (signup) {
                    modalService.showSignUpModal();
                } else {
                    modalService.showLogInModal();
                }
            };

            angular.element($window).on('scroll', function() {
                var direction;
                if (latestOffset > this.pageYOffset) {
                    direction = 'down';
                } else if (latestOffset < this.pageYOffset && this.pageYOffset > 250) {
                    direction = 'up';
                }
                latestOffset = this.pageYOffset;
                if ($scope.scrollDirection !== direction) {
                    $scope.scrollDirection = direction;
                    $timeout(function() {
                        $scope.$apply();
                    });
                }
            });

            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                if (toState) {
                    $scope.selectedStateName = toState.name;
                }
            });
        }
    ];

    angular
        .module('clixtv')
        .controller('HeaderController', HeaderController);
}());