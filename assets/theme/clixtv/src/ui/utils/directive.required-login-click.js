(function() {
    var requiredLoginClick = [
        '$rootScope',
        '$uibModal',
        'userService',
        function($rootScope, $uibModal, userService) {
            return {
                restrict: 'A',
                scope: {
                    clixRequiredLoginClick: '&'
                },
                link: function (scope, elem, attrs) {

                    function _openLoginModal() {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: 'ui/common/modal/login-signup/view.login-signup.html',
                            controller: 'LoginSignupController',
                            windowClass: 'clix-modal-window',
                            size: 'clix-md',
                            resolve: {
                                signup: false
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
                    }

                    elem.bind('click', function(e) {
                        e.preventDefault();
                        userService.getLoggedInUser()
                            .then(
                                function onSuccess(data) {
                                    if (data) {
                                        scope.clixRequiredLoginClick();
                                    } else {
                                        _openLoginModal();
                                    }
                                }
                            );
                    });
                }
            };
        }
    ];

    angular.module('clixtv')
        .directive('clixRequiredLoginClick', requiredLoginClick);
}());