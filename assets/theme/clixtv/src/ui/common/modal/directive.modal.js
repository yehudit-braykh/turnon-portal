(function() {
    var modal = [
        function() {
            return {
                restrict: 'AE',
                transclude: true,
                templateUrl: 'ui/common/modal/view.modal.html',
                scope: {
                    modalTitle: '@?'
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixModal', modal);
}());