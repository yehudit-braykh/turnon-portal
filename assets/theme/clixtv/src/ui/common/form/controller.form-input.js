(function() {

    var FormInputController = [
        '$scope',
        '$rootScope',
        function($scope, $rootScope) {

            function _getErrorContainer() {
                return angular.element(document.getElementById('clix-form-input-error-' + $scope.$id));
            }

            function _getTriggerCoordinates() {
                var trigger = angular.element(document.getElementById('clix-form-input-' + $scope.$id)),
                    triggerRect = trigger[0].getBoundingClientRect(),
                    bodyRect = document.body.getBoundingClientRect();
                return {
                    top: triggerRect.top - bodyRect.top,
                    left: triggerRect.left,
                    height: trigger[0].offsetHeight,
                    width: trigger[0].offsetWidth
                };
            }

            function _repositionError() {
                var errorContainer = _getErrorContainer(),
                    coordinates = _getTriggerCoordinates(),
                    triggerVerticalMiddle = (coordinates.top + (coordinates.height / 2)),
                    errorContainerHeight = errorContainer[0].offsetHeight,
                    errorContainerWidth = errorContainer[0].offsetWidth;

                errorContainer[0].style.top = ((triggerVerticalMiddle) - (errorContainerHeight / 2)) + 'px';
                errorContainer[0].style.left = ((coordinates.left + coordinates.width) - errorContainerWidth - 7) + 'px';
            }

            function _hideError() {
                var errorContainer = _getErrorContainer();
                if (errorContainer && errorContainer[0]) {
                    errorContainer[0].style.left = '-9999px';
                }
            }

            $scope.$watch('showError', function() {
                if ($scope.showError) {
                    _repositionError();
                } else {
                    _hideError();
                }
            });

            $scope.init = function() {
                _repositionError();
                _hideError();
            };

            $rootScope.$on('$stateChangeStart', function() {
                angular.element(document.getElementById('clix-form-input-error-' + $scope.$id)).remove();
            });

        }
    ];

    angular
        .module('clixtv')
        .controller('FormInputController', FormInputController);
}());