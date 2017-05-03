(function() {

    var modalService = [
        '$q',
        '$log',
        '$rootScope',
        '$timeout',
        '$injector',
        '$uibModal',
        function($q, $log, $rootScope, $timeout, $injector, $uibModal) {

            var _modalStack = [];

            return {
                showSignUpModal: function() {
                    this.showModal({
                        templateUrl: 'ui/common/modal/login-signup/view.login-signup.html',
                        controller: 'LoginSignupController',
                        size: 'clix-md',
                        data: {
                            signup: true
                        }
                    });
                },

                showLogInModal: function() {
                    this.showModal({
                        templateUrl: 'ui/common/modal/login-signup/view.login-signup.html',
                        controller: 'LoginSignupController',
                        size: 'clix-md',
                        data: {
                            signup: false
                        }
                    });
                },

                showConfirmationModal: function(title, message) {
                    var deregisterListener,
                        deferred = $q.defer(),
                        key = new Date().getTime();
                    this.showModal({
                        controller: 'ConfirmationModalController',
                        templateUrl: 'ui/common/modal/confirmation/view.confirmation-modal.html',
                        data: {
                            key: key,
                            title: title,
                            message: message
                        }
                    });

                    deregisterListener = $rootScope.$on('modal.confirm', function(event, data) {
                        if (data.key === key) {
                            deregisterListener();
                            deferred.resolve();
                        }
                    });

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
                        size: options.size || 'clix-lg',
                        resolve: {
                            data: options.data
                        }
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

                getNumberOfModalsInStack: function() {
                    return _modalStack.length;
                },

                closeOrPop: function() {
                    if (_modalStack.length >= 2) {
                        this.pop();
                    } else {
                        var $uibModalInstance = $injector.get('$uibModalInstance');
                        $uibModalInstance.resolve();
                    }
                },

                dismissOrPop: function() {
                    if (_modalStack.length >= 2) {
                        this.pop();
                    } else {
                        var $uibModalInstance = $injector.get('$uibModalInstance');
                        $uibModalInstance.resolve();
                    }
                },

                close: function() {

                    var $uibModalStack = $injector.get('$uibModalStack');

                    $uibModalStack.dismissAll();

                    _modalStack = [];
                }

            }
        }
    ];

    angular
        .module('clixtv')
        .factory('modalService', modalService);
}());