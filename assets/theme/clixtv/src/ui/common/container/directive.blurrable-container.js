(function() {

    var blurrableContainer = [
        '$rootScope',
        function($rootScope) {
            return {
                restrict: 'AE',
                templateUrl: 'ui/common/container/view.blurrable-container.html',
                transclude: true,
                replace: true,
                link: function(scope) {

                    scope.blurred = false;

                    function _triggerBlurOn() {
                        scope.blurred = true;
                    }

                    function _triggerBlurOff() {
                        scope.blurred = false;
                    }

                    $rootScope.$on('rightnav.open', _triggerBlurOn);
                    $rootScope.$on('rightnav.close', _triggerBlurOff);

                    $rootScope.$on('modal.open', _triggerBlurOn);
                    $rootScope.$on('modal.close', _triggerBlurOff);
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixBlurrableContainer', blurrableContainer);
}());