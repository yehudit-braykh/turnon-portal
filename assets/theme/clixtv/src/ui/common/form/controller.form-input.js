(function() {

    var FormInputController = [
        '$scope',
        function($scope) {

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

                errorContainer[0].style.top = (triggerVerticalMiddle - (errorContainerHeight / 2)) + 'px';
                errorContainer[0].style.left = ((coordinates.left + coordinates.width) - errorContainerWidth) + 'px';
            }

            $scope.init = function() {
                _repositionError();
            };

        }
    ];

    angular
        .module('clixtv')
        .controller('FormInputController', FormInputController);
}());