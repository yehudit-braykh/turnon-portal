(function() {
    var modal = [
        function() {
            return {
                restrict: 'AE',
                transclude: true,
                templateUrl: 'ui/common/modal/view.modal.html'
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixModal', modal);
}());