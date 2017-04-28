(function() {

    var clixFormInputErrorField = [
        '$timeout',
        function($timeout) {
            return {
                restrict: 'AE',
                transclude: {
                    formField: 'formField',
                    errorMessage: 'errorMessage'
                },
                templateUrl: 'ui/common/form/view.form-input.html',
                controller: 'FormInputController',
                scope: {
                    showError: '='
                },
                link: function(scope, element) {

                    // Move the error message to the end of the <body /> so as to
                    // not disrupt the page flow
                    $timeout(function() {
                        var errorMessageContainer = angular.element(document.getElementById('clix-form-input-error-' + scope.$id));
                        angular.element(document.body).append(errorMessageContainer);
                        scope.init();
                    });
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixFormInputErrorField', clixFormInputErrorField);
}());