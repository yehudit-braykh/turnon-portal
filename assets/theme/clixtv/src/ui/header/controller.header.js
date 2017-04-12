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
        function($q, $scope, $rootScope, $window, $timeout, $uibModal, notificationsService, knetikService) {

            var latestOffset = 0;

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
                            $scope.points = data[1];
                        }
                    );
            }

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
                _populateHeaderData();
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
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'ui/common/modal/login-signup/view.login-signup.html',
                    controller: 'LoginSignupController',
                    windowClass: 'clix-modal-window',
                    size: 'clix-md',
                    resolve: {
                        signup: (signup !== false)
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
            })
        }
    ];

    angular
        .module('clixtv')
        .controller('HeaderController', HeaderController);
}());