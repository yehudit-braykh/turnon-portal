(function() {

    var modalService = [
        '$q',
        '$log',
        '$rootScope',
        '$timeout',
        '$uibModal',
        function($q, $log, $rootScope, $timeout, $uibModal) {

            var _modalStack = [];

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
                },

                showModal: function(options) {
                    var deferred, modalInstance;

                    // Go through all modals in the stack and add the "slide-out" class so they
                    // move out of the way of the new modal coming in.
                    if (_modalStack.length > 0) {
                        [].forEach.bind(document.getElementsByClassName('clix-modal-window'), function(modal) {
                            angular.element(modal).addClass('slide-out');
                        })();
                    }

                    deferred = $q.defer();
                    modalInstance = $uibModal.open({
                        animation: true,
                        backdrop: _modalStack.length > 0 ? false : 'static',
                        controller: options.controller,
                        templateUrl: options.templateUrl,
                        windowClass: 'clix-modal-window ' + ((_modalStack.length > 0) ? 'slide-in' : ''),
                        size: 'clix-lg'
                    });

                    _modalStack.push(modalInstance);

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
                },

                pop: function() {
                    if (_modalStack.length < 2) {

                        $log.log('Not enough modals in the stack to pop(...)');
                        return;
                    }

                    var modalInstances = document.getElementsByClassName('clix-modal-window'),
                        backdropInstances = document.getElementsByClassName('modal-backdrop');

                    var currentInstance = modalInstances[0],
                        previousInstance = modalInstances[1];

                    var currentBackdropInstance = backdropInstances[0],
                        backdropZIndex = parseFloat(currentBackdropInstance.style.zIndex);

                    angular.element(currentInstance).removeClass('in');
                    angular.element(previousInstance).removeClass('slide-out');

                    previousInstance.style.zIndex = backdropZIndex + 1;

                    $timeout(function() {
                        angular.element(currentInstance).remove();
                    }, 250);

                    _modalStack.splice(-1);

                },

                numberOfModalsInStack: function() {
                    return _modalStack.length;
                }

            }
        }
    ];

    angular
        .module('clixtv')
        .factory('modalService', modalService);
}());