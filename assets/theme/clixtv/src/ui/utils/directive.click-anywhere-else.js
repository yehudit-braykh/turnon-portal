(function() {
    var clickAnywhereElse = [
        '$document',
        function($document) {
            return {
                restrict: 'A',
                scope: {
                    callback : '=clixClickAnywhereElse'
                },
                link: function(scope, element) {
                    var handler = function(event) {
                        if (!element[0].contains(event.target)) {
                            scope.callback(event);
                        }
                    };

                    $document.on('click', handler);
                    scope.$on('$destroy', function() {
                        $document.off('click', handler);
                    });
                }
            }
        }
    ];

    angular.module('clixtv')
        .directive('clixClickAnywhereElse', clickAnywhereElse);
}());