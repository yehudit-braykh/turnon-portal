(function() {

    var HeaderController = [
        '$scope',
        '$rootScope',
        '$window',
        '$timeout',
        '$uibModal',
        function($scope, $rootScope, $window, $timeout, $uibModal) {

            var latestOffset = 0;

            $rootScope.$on('user.login', function(event, data) {
                $scope.loggedInUser = data;
            });

            $rootScope.$on('user.logout', function(event, data) {
                delete $scope.loggedInUser;
            });

            $scope.onNamePress = function() {
                $rootScope.$broadcast('rightnav.open');
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
                } else if (latestOffset < this.pageYOffset && this.pageYOffset > 50) {
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

            $scope.finished_login = function(data) {
                console.log(data);
            }

        }
    ];

    angular
        .module('clixtv')
        .controller('HeaderController', HeaderController);
}());