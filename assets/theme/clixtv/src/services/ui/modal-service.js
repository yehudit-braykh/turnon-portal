(function() {

    var modalService = [
        '$q',
        '$rootScope',
        '$uibModal',
        function($q, $rootScope, $uibModal) {

            function _showLoginSignupModal(signup) {
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
            }

            return {
                showSignUpModal: function() {
                    _showLoginSignupModal(true);
                },

                showLogInModal: function() {
                    _showLoginSignupModal(false);
                },

                showConfirmationModal: function(title, message) {
                    var deferred = $q.defer();
                    var modalInstance = $uibModal.open({
                        animation: true,
                        controller: 'ConfirmationModalController',
                        templateUrl: 'ui/common/modal/confirmation/view.confirmation-modal.html',
                        windowClass: 'clix-modal-window',
                        size: 'clix-lg',
                        resolve: {
                            modalData: {
                                title: title,
                                message: message
                            }
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
                            deferred.resolve(data);
                        },
                        function onError(error) {
                            // deferred.reject(error);
                        }
                    );
                    return deferred.promise;
                }
            }
        }
    ];

    angular
        .module('clixtv')
        .factory('modalService', modalService);
}());